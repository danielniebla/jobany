import { Component, OnInit , Renderer2, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { StorageServiceService } from '../storage-service.service';


@Component({
  selector: 'app-planeacion',
  templateUrl: './planeacion.component.html',
  styleUrls: ['./planeacion.component.css']
})
export class PlaneacionComponent implements OnInit {
  @Input() pregunta2: any;
  constructor(private router: Router,private http: HttpClient, private cdRef: ChangeDetectorRef,private renderer: Renderer2, private storage: Storage, private storageservice : StorageServiceService) { }
  acciones: any[] = [];
  url: any[] = [];
  edit: Record<number, boolean> = {};
  accion='';
  nueva= false;
  fecha='';
  meta=0;
  alert=false;
  option: boolean | null | undefined;
  contador=0;
  time=10000;
  server = '';
  redireccionar(accion: any) {
    window.open(this.url[accion.id_cumplimiento], '_blank');
    window.alert('entonces que pedo');
  }  
  uploadImage($event: any,accion: any){
    const file = $event.target.files[0];

    const ruta_fire = ref(this.storage, `${accion.id_cumplimiento}/${file.name.slice(0, file.name.lastIndexOf('.'))}/${file.name}`);// como aqui

    uploadBytes(ruta_fire, file)
    .then(response=> console.log(response),
    accion.documentos= file.name)
    .catch(error=> console.log(error));

  }
  editarRecomendacion(accion: any) {
    const imagenDisk = document.querySelector(`.disk[data-index="${accion.id_cumplimiento}"]`) as HTMLImageElement;

    // Verifica si se encontró la imagen 'disk'
    if (imagenDisk) {
      // Agrega la clase deseada
      this.renderer.addClass(imagenDisk, 'edit');
    }
    const textAreas = document.querySelectorAll(`.txtArea[data-index="${accion.id_cumplimiento}"]`);
    textAreas.forEach((textarea) => {
      this.renderer.addClass(textarea as HTMLElement, 'edit');
      (textarea as HTMLTextAreaElement).readOnly = false;
    });
    this.edit[accion.id_cumplimiento]=false;
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
        "id_cumplimiento": idRecomendacion,
        "id_pregunta": 0,
        "id_recomendacion": 0,
        "acciones_realizadas": "string",
        "fecha": "2023-11-19T00:00:00",
        "meta_alcanzada": 0,
        "documentos": "string"
      };
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'accept': '*/*' // Agregar el encabezado de aceptación, según lo esperado
        }),
        body: recomendacionAEliminar // Agregar el cuerpo de la solicitud con los datos a eliminar
      };
      
      this.http.delete(`${this.server}/api/Cumplimiento/Eliminar_Cumplimiento`, httpOptions)
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
    const authEndpoint = `${this.server}/api/Cumplimiento/Consultar_Cumplimiento`;

    // Datos para enviar
    const authData = {
    "id_cumplimiento":0,
      "id_pregunta": this.pregunta2,
      "id_recomendacion": 0,
      "acciones_realizadas": "a",
      "fecha": "2023-11-27T07:40:32.558Z",
      "meta_alcanzada": 0,
      "documentos": "documentos"
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
        this.acciones= response;
        this.setearFecha()

      }, (error) => {
        console.error('Error:', error);
      });
      
  }
  setearFecha(){
    this.acciones.forEach(accion => {
      accion.fecha = accion.fecha.substring(0, 10);
      this.edit[accion.id_cumplimiento]=true;
      const images = ref(this.storage, `${accion.id_cumplimiento}/${accion.documentos}`);
      listAll(images).then(async response=>{
        for(let item of response.items){
          this.url[accion.id_cumplimiento] = await getDownloadURL(item);
        }
      }).catch(error => console.log(error))
    });
     
  }
  ngOnInit(): void {

    this.server = this.storageservice.getDataItem('server') ?? '';
    this.actualizarDatosRecomendacion();
  }
  validar(accion: any):boolean{
    let validaciones: string[] = [];
    if(accion.acciones_realizadas==''){
      validaciones.push("acciones");
    }
    if(accion.fecha==''){
      validaciones.push("fecha");
    }
    if(accion.meta==0){
      validaciones.push("meta");
    }
    if(validaciones.length !=0){
      let mensaje = 'los campos: '+ validaciones.join(", ") + ' estan vacios.';
      return false;
    }else{
      return true;
    }
  }
  actualizarRecomendacion(accion: any) {
    if(this.validar(accion)){
      const authEndpoint = `${this.server}/api/Cumplimiento/Actualizar_Cumplimiento`;
      const authData = {
        "id_cumplimiento": accion.id_cumplimiento,
        "id_pregunta": accion.id_pregunta,
        "id_recomendacion": accion.id_recomendacion,
        "acciones_realizadas": accion.acciones_realizadas,
        "fecha": accion.fecha,
        "meta_alcanzada": accion.meta,
        "documentos": accion.documentos
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
   

  }
  validarn():boolean{
    let validaciones: string[] = [];
    if(this.accion==''){
      validaciones.push("acciones");
    }
    if(this.fecha==''){
      validaciones.push("fecha");
    }
    if(this.meta == 0){
      validaciones.push("meta");
    }
    if(validaciones.length !=0){
      let mensaje = 'los campos: '+ validaciones.join(", ") + ' estan vacios.';
      return false;
    }else{
      return true;
    }
  }
  nuevaRecomendacion(){
    if(this.validarn()){
      const authEndpoint = `${this.server}/api/Cumplimiento/Agregar_Cumplimiento`;
    const authData = {
      "id_cumplimiento": 0,
      "id_pregunta": this.pregunta2,
      "id_recomendacion": 0,
      "acciones_realizadas": this.accion,
      "fecha": this.fecha,
      "meta_alcanzada": this.meta,
      "documentos": "string"
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
    
  }

}
