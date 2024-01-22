import { Component, OnInit , Renderer2, Input} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-recomendacion',
  templateUrl: './recomendacion.component.html',
  styleUrls: ['./recomendacion.component.css']
})
export class RecomendacionComponent implements OnInit {
  @Input() pregunta: any;
  @Input() margen: any;
  constructor(private router: Router,private http: HttpClient, private cdRef: ChangeDetectorRef,private renderer: Renderer2, private storage : StorageServiceService) { }
  recomendaciones: any[] = [];
  incumplio: Record<number, boolean> = {};
  nombre='';
  accion='';
  responsable='';
  objetivos='';
  nueva= false;
  fecha_l='';
  fecha_a='';
  fecha_r='';
  meta=0;
  alert=false;
  option: boolean | null | undefined;
  contador=0;
  time=10000;
  cumplido=0;
  server = '';
  editarRecomendacion(idRecomendacion: number) {
    const imagenDisk = document.querySelector(`.disk[data-index="${idRecomendacion}"]`) as HTMLImageElement;

    // Verifica si se encontró la imagen 'disk'
    if (imagenDisk) {
      // Agrega la clase deseada
      this.renderer.addClass(imagenDisk, 'edit');
    }
    const cumplido = document.querySelector(`.cumplido[data-index="${idRecomendacion}"]`) as HTMLImageElement;

    if (cumplido) {
      // Agrega la clase deseada
      this.renderer.addClass(cumplido, 'edit');
    }
    const textAreas = document.querySelectorAll(`.txtArea[data-index="${idRecomendacion}"]`);
    textAreas.forEach((textarea) => {
      this.renderer.removeClass(textarea as HTMLElement, 'txtArea');
      (textarea as HTMLTextAreaElement).readOnly = false;
    });
  }
  agregarRecomendacion() {
    this.nueva=true;
  }
  aceptarBorrado() {
    this.option = true;
  }
  
  cancelarBorrado() {
    this.option = false;
  }
  async eleccion(){
    if (this.option != null && this.option === true) {
      this.contador = 0;
      this.option = null;
    } else if (this.option != null && this.option === false) {
      this.alert = false;
      this.contador = 0;
      this.option = null;
    }
  }
  borrarRecomendacion(idRecomendacion: number){
    if(this.alert){
      const recomendacionAEliminar = {
        "id_recomendacion": idRecomendacion,
        "id_pregunta": 0,
        "nombre": "string",
        "accion": "string",
        "responsable": "string",
        "objetivos": "string",
        "porcentaje_metas": 0,
        "fecha_limite": "2023-11-27T08:00:06.530Z",
        "semaforo_ama": "2023-11-27T08:00:06.530Z",
        "semaforo_rojo": "2023-11-27T08:00:06.530Z",
        "cumplido": false
      };
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'accept': '*/*' // Agregar el encabezado de aceptación, según lo esperado
        }),
        body: recomendacionAEliminar // Agregar el cuerpo de la solicitud con los datos a eliminar
      };
      
      this.http.delete(`${this.server}/api/Recomendaciones/Eliminar_Recomendacion`, httpOptions)
        .subscribe(
          (response: any) => {
            // Manejar la respuesta aquí si es necesario
            this.actualizarDatosRecomendacion();
          },
          (error) => {
            // Manejar errores aquí
            console.error('Error:', error);
          }
        );
      
    }
    if(this.alert){
      this.alert=false;
    } 
  }

  verificarBorradoRecomendacion(idRecomendacion: number) {
    this.alert = true;
    this.contador = 10;
    const intervalo = setInterval(() => {
      if(this.contador==0){
        this.borrarRecomendacion(idRecomendacion);
        clearInterval(intervalo);
      }else{
        this.contador--;
        this.eleccion();
      }
    }, 1000);

  }
  
  actualizarDatosRecomendacion(){
    const authEndpoint = `${this.server}/api/Recomendaciones/Consultar_Recomendacion`;

    // Datos para enviar
    const authData = {
      "id_recomendacion": 0,
      "id_pregunta": this.pregunta,
      "nombre": "string",
      "accion": "string",
      "responsable": "string",
      "objetivos": "string",
      "porcentaje_metas": 0,
      "fecha_limite": "2023-11-27T08:00:06.530Z",
      "semaforo_ama": "2023-11-27T08:00:06.530Z",
      "semaforo_rojo": "2023-11-27T08:00:06.530Z",
      "cumplido": false
    }
    ;

    // Encabezados para la solicitud POST
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Realizar la solicitud POST para obtener el token
    this.http.post(authEndpoint, authData, httpOptions)
      .subscribe((response: any) => {
        // Aquí puedes manejar la respuesta del servidor
        this.recomendaciones = response;
      }, (error) => {
        console.error('Error:', error);
      });
      setTimeout(() => {
        const textAreas = document.querySelectorAll(`.txtArea`) as NodeListOf<HTMLTextAreaElement>;
  
        if (textAreas) {
          textAreas.forEach((textarea: HTMLTextAreaElement) => {
            // Establece la propiedad readOnly para cada textarea
            textarea.readOnly = true;
          });
        }
      }, 100);
  }
  determinarClase(recomendacion: any): string {
    recomendacion.fecha_limite = recomendacion.fecha_limite.substring(0, 10);
    const diasLimite = this.margen;

    const fechaOriginalDate = new Date(recomendacion.fecha_limite);
    const fechaActual = new Date();

    // Obtener la diferencia en días
    const diferenciaEnMilisegundos =  fechaOriginalDate.getTime() - fechaActual.getTime();
    const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

    // Lógica para verificar si la diferencia está dentro del rango permitido
    if (diferenciaEnDias >= diasLimite) {
      this.incumplio[recomendacion.idRecomendacion]=false;
    } else {
      this.incumplio[recomendacion.idRecomendacion]=true;
    }

    if (recomendacion.cumplido) {
      return 'cumplio';
    } else if (this.incumplio[recomendacion.idRecomendacion]) {
      return 'incumplio';
    } else {
      return ''; // Otra clase o ninguna clase
    }
  }
  ngOnInit(): void {
    this.server = this.storage.getDataItem('server') ?? '';
    this.actualizarDatosRecomendacion();
    setTimeout(() => {
      const textAreas = document.querySelectorAll(`.txtArea`) as NodeListOf<HTMLTextAreaElement>;

      if (textAreas) {
        textAreas.forEach((textarea: HTMLTextAreaElement) => {
          // Establece la propiedad readOnly para cada textarea
          textarea.readOnly = true;
        });
      }
    }, 1000);

  }
  actualizarRecomendacion(recomendacion: any) {
    const authEndpoint = `${this.server}/api/Recomendaciones/Actualizar_Recomendacion`;
    const authData = 
    {
      "id_recomendacion": recomendacion.id_recomendacion,
      "id_pregunta": recomendacion.id_pregunta,
      "nombre": recomendacion.nombre,
      "accion": recomendacion.accion,
      "responsable": recomendacion.responsable,
      "objetivos": recomendacion.objetivos,
      "porcentaje_metas": recomendacion.porcentaje_metas,
      "fecha_limite": recomendacion.fecha_limite,
      "semaforo_ama": recomendacion.semaforo_ama,
      "semaforo_rojo": recomendacion.semaforo_rojo,
      "cumplido": recomendacion.cumplido
    };

    // Encabezados para la solicitud POST
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Realizar la solicitud POST para obtener el token
    this.http.post(authEndpoint, authData, httpOptions)
      .subscribe((response: any) => {
        // Aquí puedes manejar la respuesta del servidor
        this.actualizarDatosRecomendacion();
      }, (error) => {
        console.error('Error:', error);
      });

  }
  nuevaRecomendacion(){
    const authEndpoint = `${this.server}/api/Recomendaciones/Agregar_Recomendacion`;
    const authData = 
    {
      "id_recomendacion": 0,
      "id_pregunta": this.pregunta,
      "nombre": this.nombre,
      "accion": this.accion,
      "responsable": this.responsable,
      "objetivos": this.objetivos,
      "porcentaje_metas": this.meta,
      "fecha_limite": this.fecha_l+"T07:40:32.558Z",
      "semaforo_ama": "2023-11-27T08:00:06.530Z",
      "semaforo_rojo": "2023-11-27T08:00:06.530Z",
      "cumplido": false
    };

    // Encabezados para la solicitud POST
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Realizar la solicitud POST para obtener el token
    this.http.post(authEndpoint, authData, httpOptions)
      .subscribe((response: any) => {
        // Aquí puedes manejar la respuesta del servidor
        this.actualizarDatosRecomendacion();
        this.nueva=false;
      }, (error) => {
        console.error('Error:', error);
      });
  }
  cumplioToggle(recomendacion: any) {
    recomendacion.cumplido = !recomendacion.cumplido;
  }
    
    
}