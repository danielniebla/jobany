import { Component, OnInit , Renderer2, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-crudfacarreras',
  templateUrl: './crudfacarreras.component.html',
  styleUrls: ['./crudfacarreras.component.css']
})
export class CrudfacarrerasComponent {
  constructor(private router: Router,private http: HttpClient, private cdRef: ChangeDetectorRef,private renderer: Renderer2, private storage : StorageServiceService) { }
  carreras: any[] = [];
  facultades: any[] = [];
  nueva= false;
  selectedfacultad:{[key:number]:number}={};
  selctFlag:{[key:number]:boolean}={};
  carrera= '';
  alert=false;
  option: boolean | null | undefined;
  contador=0;
  time=10000;
  visi=false;
  server='';
  page=1;
  pages=1;
  paged=5;
  paginador(i:number){
    this.page=this.page+i;
    this.page = Math.round(this.page);
    if(this.page<1){
      this.page=1;
    }
    if(this.page>this.pages){
      this.page=this.pages;
    }
  }
  paginas(){
    this.pages=Math.ceil(this.carreras.length/this.paged); 
  }
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
        "id_carrera": idRecomendacion,
        "nombre": "string",
        "id_facultad": 0
      };
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'accept': '*/*' // Agregar el encabezado de aceptación, según lo esperado
        }),
        body: recomendacionAEliminar // Agregar el cuerpo de la solicitud con los datos a eliminar
      };
      
      this.http.delete(`${this.server}/api/Carreras/Eliminar_Carrera`, httpOptions)
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
    const authEndpoint = `${this.server}/api/Carreras/Consultar_Carrera`;

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
        this.carreras= response;
        this.pages=Math.ceil(this.carreras.length/this.paged); 
      }, (error) => {
        console.error('Error:', error);
      });
      
  }
  private async loadData() {
    this.server = this.storage.getDataItem('server') || '';
  }
  ngOnInit(): void {
    this.loadData();
    this.actualizarDatosRecomendacion();
    this.actualizarDatosfacultad();
   
  }
  actualizarRecomendacion(carrer: any) {
    if(carrer.nombre != '' && this.selectedfacultad[carrer.id_carrera] != 0){
    const authEndpoint = `${this.server}/api/Carreras/Actualizar_Carrera`;
    const authData = 
    {
      "id_carrera": carrer.id_carrera,
      "nombre": carrer.nombre,
      "id_facultad": this.selectedfacultad[carrer.id_carrera]
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
        this.selctFlag[carrer.id_carrera]=false;
      }, (error) => {
        console.error('Error:', error);
      });
    }else{
      window.alert('favor de llenar todos los campos antes de guardar');
    }
  }
  nuevaRecomendacion(){
    if(this.carrera != '' && this.selectedfacultad[0] != 0){
    const authEndpoint = `${this.server}/api/Carreras/Agregar_Carrera`;
    const authData = 
    {
      "id_carrera": 0,
      "nombre": this.carrera,
      "id_facultad": this.selectedfacultad[0]
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
  actualizarDatosfacultad(){
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
  facultad(carrera: any) {

      const facultadCorrespondiente = this.facultades.find(facultad => facultad.id_facultad === carrera.id_facultad);
      return facultadCorrespondiente ? facultadCorrespondiente.nombre : 'No encontrado';

  }
}
