import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageServiceService } from '../storage-service.service';
@Component({
  selector: 'app-ficha-1',
  templateUrl: './ficha-1.component.html',
  styleUrls: ['./ficha-1.component.css']
})
export class Ficha1Component implements OnInit {
  constructor(private http: HttpClient,private renderer: Renderer2, private storage : StorageServiceService) { 
    this.carrera = '';
  }
  @Input() carrera: string;
  ficha: any[] = [];
  server='';
  mensaje='';
  getficha(){
    this.ficha=[];
    const authEndpoint = `${this.server}/api/Informe/Consultar_Informe1?id_carrera=${this.carrera}`;

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
  validar(ficha: any):boolean{
    
    if(ficha[0].lugar_fecha==''){
      this.mensaje = 'El campo esta vacio, favor de llanarlo.';
      
      return false;
    }else{    
        return true;
    }
  }
  editar() {

    const imagenDisk = document.querySelector(`.disk`) as HTMLImageElement;

    // Verifica si se encontró la imagen 'disk'
    if (imagenDisk) {
      // Agrega la clase deseada
      this.renderer.addClass(imagenDisk, 'editing');
    }
    const lugarf = document.querySelector(`.lf`) as HTMLInputElement;

    // Verifica si se encontró la imagen 'disk'
    if (lugarf) {
      // Agrega la clase deseada
      this.renderer.addClass(lugarf, 'edit');
      lugarf.readOnly = false;
    }
  }
  editarficha(){
    if(this.validar(this.ficha)){
    const authEndpoint = `${this.server}/api/Informe/Actualizar_Informe1`;
      const authData = {
        "id_informe": this.ficha[0].id_informe,
        "id_carrera": this.carrera,
        "lugar_fecha": this.ficha[0].lugar_fecha
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
          this.ficha = response
          this.getficha();
        }, (error) => {
          console.error('Error:', error);
        });
      const imagenDisk = document.querySelector(`.disk`) as HTMLImageElement;

      // Verifica si se encontró la imagen 'disk'
      if (imagenDisk) {
        // Agrega la clase deseada
        this.renderer.removeClass(imagenDisk, 'editing');
      }
      const lugarf = document.querySelector(`.lf`) as HTMLInputElement;

      // Verifica si se encontró la imagen 'disk'
      if (lugarf) {
        // Agrega la clase deseada
        this.renderer.removeClass(lugarf, 'edit');
        lugarf.readOnly = true;
      }
    }else{
      window.alert(this.mensaje);
      setTimeout(() => {
        this.mensaje='';
      }, 100);
    }
  
  }
  private async loadData() {
    this.server = this.storage.getDataItem('server') || '';
  }
  ngOnInit(): void {
    this.loadData();
    this.getficha(); 
    const lugarf = document.querySelector(`.lf`) as HTMLInputElement;
    if (lugarf) {
      lugarf.readOnly = true;
    }
  }
}
