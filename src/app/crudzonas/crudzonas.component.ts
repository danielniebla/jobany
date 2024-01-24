import { Component, OnInit , Renderer2, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-crudzonas',
  templateUrl: './crudzonas.component.html',
  styleUrls: ['./crudzonas.component.css']
})
export class CrudzonasComponent {
  constructor(private router: Router,private http: HttpClient, private cdRef: ChangeDetectorRef,private renderer: Renderer2, private storage : StorageServiceService) { }
  zonas: any[] = [];
  nueva= false;
  zona='';
  alert=false;
  option: boolean | null | undefined;
  contador=0;
  time=10000;
  server = '';
  editarRecomendacion(idRecomendacion: number) {
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
        "id_zona": idRecomendacion,
        "nombre": "string"
      };
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'accept': '*/*' // Agregar el encabezado de aceptación, según lo esperado
        }),
        body: recomendacionAEliminar // Agregar el cuerpo de la solicitud con los datos a eliminar
      };
      
      this.http.delete(`${this.server}/api/Zona/Eliminar_Zona`, httpOptions)
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
        this.eleccion();
      }
    }, 1000);

  }
  
  actualizarDatosRecomendacion(){
    const authEndpoint = `${this.server}/api/Zona/Consultar_Zona`;
// Encabezados para la solicitud GET
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Realizar la solicitud GET para obtener los datos
    this.http.get(authEndpoint, httpOptions)
      .subscribe((response: any) => {
        // Aquí puedes manejar la respuesta del servidor
        this.zonas = response;
      }, (error) => {
        console.error('Error:', error);
      });

      }
  ngOnInit(): void {
    
    this.server = this.storage.getDataItem('server') ?? '';
    this.actualizarDatosRecomendacion();
  }
  actualizarRecomendacion(zona: any) {
    if(zona.nombre != ''){
    const authEndpoint = `${this.server}/api/Zona/Actualizar_Zona`;
    const authData = {
      "id_zona": zona.id_zona,
      "nombre": zona.nombre
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
    }else{
      window.alert('favor de llenar todos los campos antes de guardar');
    }
  }
  nuevaRecomendacion(){
    if(this.zona != ''){
    const authEndpoint = `${this.server}/api/Zona/Agregar_Zona`;
    const authData = {
      "id_zona": 0,
      "nombre": this.zona
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
    }else{
      window.alert('favor de llenar todos los campos antes de guardar');
    }
  }

}
