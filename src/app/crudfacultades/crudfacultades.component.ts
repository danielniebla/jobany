import { Component, OnInit , Renderer2, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-crudfacultades',
  templateUrl: './crudfacultades.component.html',
  styleUrls: ['./crudfacultades.component.css']
})
export class CrudfacultadesComponent {
  constructor(private router: Router,private http: HttpClient, private cdRef: ChangeDetectorRef,private renderer: Renderer2, private storage : StorageServiceService) { }
  facultades: any[] = [];
  zonas: any[] = [];
  nueva= false;
  selectedzona:{[key:number]:number}={};
  selctFlag:{[key:number]:boolean}={};
  facultad= '';
  alert=false;
  option: boolean | null | undefined;
  contador=0;
  time=10000;
  visi=false;
  server='';
  editarRecomendacion(idRecomendacion: number) {
    if(this.selctFlag[idRecomendacion]==null ||this.selctFlag[idRecomendacion]== false){
      this.selctFlag[idRecomendacion] = true;
    } 
    const imagenDisk = document.querySelector(`.disk[data-index="${idRecomendacion}"]`) as HTMLImageElement;

    // Verifica si se encontró la imagen 'disk'
    if (imagenDisk) {
      // Agrega la clase deseada
      this.renderer.addClass(imagenDisk, 'edit');
    }
    const textAreas = document.querySelectorAll(`.txtArea[data-index="${idRecomendacion}"]`);
    textAreas.forEach((textarea) => {
      this.renderer.removeClass(textarea as HTMLElement, 'txtArea');
    });
    const camps = document.querySelectorAll(`.campo[data-index="${idRecomendacion}"]`);
    camps.forEach((camp) => {
      this.renderer.addClass(camp as HTMLElement, 'new');
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
        "id_facultad": idRecomendacion,
        "id_zona": 4,
        "nombre": "Ingeniería"
      };
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'accept': '*/*' // Agregar el encabezado de aceptación, según lo esperado
        }),
        body: recomendacionAEliminar // Agregar el cuerpo de la solicitud con los datos a eliminar
      };
      
      this.http.delete(`${this.server}/api/Facultades/Eliminar_Facultad`, httpOptions)
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
    const authEndpoint = `${this.server}/api/Facultades/Consultar_Facultad`;

    // Encabezados para la solicitud POST
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Realizar la solicitud POST para obtener el token
    this.http.get(authEndpoint, httpOptions)
      .subscribe((response: any) => {
        // Aquí puedes manejar la respuesta del servidor
        this.facultades= response;
      }, (error) => {
        console.error('Error:', error);
      });
      
  }
  ngOnInit(): void {
    this.server = this.storage.getDataItem('server') ?? '';
    this.actualizarDatosRecomendacion();
    this.actualizarDatosZona();
    
   
  }
  actualizarRecomendacion(facultad: any) {
    const authEndpoint = `${this.server}/api/Facultades/Actualizar_Facultad`;
    const authData = {
      "id_facultad": facultad.id_facultad,
      "id_zona": this.selectedzona[facultad.id_facultad],
      "nombre": facultad.nombre
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
          this.selctFlag[facultad.id_facultad]=false;
      }, (error) => {
        console.error('Error:', error);
      });

  }
  nuevaRecomendacion(){
    const authEndpoint = `${this.server}/api/Facultades/Agregar_Facultad`;
    const authData = {
      "id_facultad": 0,
      "id_zona": this.selectedzona[0],
      "nombre": this.facultad
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
  actualizarDatosZona(){
    const authEndpoint = `${this.server}/api/Zona/Consultar_Zona`;


    // Encabezados para la solicitud POST
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Realizar la solicitud POST para obtener el token
    this.http.get(authEndpoint, httpOptions)
      .subscribe((response: any) => {
        // Aquí puedes manejar la respuesta del servidor
        this.zonas= response;
      }, (error) => {
        console.error('Error:', error);
      });
      
  }
  zona(idFacultad: number) {
    const facultad = this.facultades.find(facultad => facultad.id_facultad === idFacultad);
  
    if (facultad) {
      const zonaCorrespondiente = this.zonas.find(zona => zona.id_zona === facultad.id_zona);
      return zonaCorrespondiente ? zonaCorrespondiente.nombre : 'No encontrado';
    }
  
    return 'No encontrado';
  }
}
