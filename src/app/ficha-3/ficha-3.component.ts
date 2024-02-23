import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageServiceService } from '../storage-service.service';

interface Ficha3 {
  id_informe: number;
  id_facultad: number;
  nombre: string;
  campus: string;
  fecha_inicio: string;
  mision: string;
  vision: string;
  objetivos_estrategicos: string;
}
@Component({
  selector: 'app-ficha-3',
  templateUrl: './ficha-3.component.html',
  styleUrls: ['./ficha-3.component.css']
})
export class Ficha3Component implements OnInit {
  constructor(private http: HttpClient,private renderer: Renderer2, private storage : StorageServiceService) {
    this.carrera = '';
   }
  ficha: Ficha3[] = [{
    id_informe: 0,
    id_facultad: 0,
    nombre: "",
    campus: "",
    fecha_inicio: "",
    mision: "",
    vision: "",
    objetivos_estrategicos: ""
  }];
  server='';
  @Input() carrera: string;
  // ficha: any[] = [];
  faculta='';
  mensaje = '';
  facultad='';
  getficha(){
    const authEndpoint = `${this.server}/api/Informe3/Consultar_Informe3?id_facultad=${this.facultad}`;
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
          this.ficha = response;
        }, (error) => {
          console.error('Error:', error);
        });
  }
  editar() {
    const imagenDisk = document.querySelector(`.disk3`) as HTMLImageElement;

    // Verifica si se encontró la imagen 'disk'
    if (imagenDisk) {
      // Agrega la clase deseada
      this.renderer.addClass(imagenDisk, 'editing');
    }
    const lugares = document.querySelectorAll('.lf3') as NodeListOf<HTMLInputElement>;

    lugares.forEach((lugar) => {
      this.renderer.addClass(lugar, 'edit');
      lugar.readOnly = false;
    });

  }
  validar(ficha: any):boolean{
    let validaciones: string[] = [];
    
    if(ficha[0].nombre==''){
      validaciones.push("nombre");
    }
    if(ficha[0].campus==''){
      validaciones.push("campus");
    }
    if(ficha[0].fecha_inicio==''){
      validaciones.push("fecha_inicio");
    }
    if(ficha[0].mision==''){
      validaciones.push("mision");
    }
    if(ficha[0].vision==''){
      validaciones.push("vision");
    }
    if(ficha[0].objetivos_estrategicos==''){
      validaciones.push("objetivos estrategicos");
    }
    

    if(validaciones.length !=0){
      this.mensaje = 'los campos: '+ validaciones.join(", ") + ' estan vacios.';
      return false;
    }else{
        return true;
    }
  }
  editarficha(){
    if(this.validar(this.ficha)){
      const authEndpoint = `${this.server}/api/Informe3/Actualizar_Informe3`;
      const authData = {
        "id_informe": this.ficha[0].id_informe ?? 0,
        "id_facultad": this.ficha[0].id_facultad ?? 0,
        "nombre": this.ficha[0].nombre ?? '',
        "campus": this.ficha[0].campus ?? '',
        "fecha_inicio": this.ficha[0].fecha_inicio ?? '',
        "mision": this.ficha[0].mision ?? '',
        "vision": this.ficha[0].vision ?? '',
        "objetivos_estrategicos": this.ficha[0].objetivos_estrategicos ?? ''
      };
    
      // Encabezados para la solicitud POST
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    
        // Realizar la solicitud POST para obtener el token
      this.http.post(authEndpoint,authData, httpOptions)
        .subscribe((response: any) => {
          // Aquí puedes manejar la respuesta del servidor
          this.ficha = response;
          // this.getFacultad();
        }, (error) => {
          console.error('Error:', error);
        });
      const imagenDisk = document.querySelector(`.disk3`) as HTMLImageElement;

      // Verifica si se encontró la imagen 'disk'
      if (imagenDisk) {
        // Agrega la clase deseada
        this.renderer.removeClass(imagenDisk, 'editing');
      }
      const lugares = document.querySelectorAll('.lf3') as NodeListOf<HTMLInputElement>;

      lugares.forEach((lugar) => {
        this.renderer.removeClass(lugar, 'edit');
        lugar.readOnly = true;
      });
    }else{
      window.alert(this.mensaje);
      setTimeout(() => {
        this.mensaje='';
      }, 100);
    }
  }
  getFacultad(){
    const authEndpoint = `${this.server}/api/Carreras/Consultar_Carrera_Id?id_carrera=${this.carrera}`;

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
        this.facultad = response[0].id_facultad;
        this.getficha();
      }, (error) => {
        console.error('Error:', error);
      });
  }
  private async loadData() {
    this.server = this.storage.getDataItem('server') || '';
  }
  ngOnInit(): void {
    this.loadData();
    this.getFacultad();
    const lugares = document.querySelectorAll('.lf3') as NodeListOf<HTMLInputElement>;

    lugares.forEach((lugar) => {
      lugar.readOnly = true;
    });

  }
}
