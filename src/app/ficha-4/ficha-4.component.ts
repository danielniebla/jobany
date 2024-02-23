import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageServiceService } from '../storage-service.service';
@Component({
  selector: 'app-ficha-4',
  templateUrl: './ficha-4.component.html',
  styleUrls: ['./ficha-4.component.css']
})
export class Ficha4Component implements OnInit {
  constructor(private http: HttpClient,private renderer: Renderer2, private storage : StorageServiceService) { 
    this.carrera = '';
  }
  @Input() carrera: string;
  ficha: any[] = [];
  server='';
  carre='';
  mensaje = '';
  getficha(){
    const authEndpoint = `${this.server}/api/Informe4/Consultar_Informe4?id_carrera=${this.carrera}`;
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
      const authEndpointc = `${this.server}/api/Carreras/Consultar_Carrera_Id?id_carrera=${this.carrera}`;
        // Encabezados para la solicitud POST
        const httpOptionsc = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };

        // Realizar la solicitud POST para obtener el token
        this.http.get(authEndpointc, httpOptionsc)
          .subscribe((response: any) => {
            // Aquí puedes manejar la respuesta del servidor
            this.carre = response[0].nombre;
          }, (error) => {
            console.error('Error:', error);
          });
  }
  editar() {
    const imagenDisk = document.querySelector(`.disk4`) as HTMLImageElement;

    // Verifica si se encontró la imagen 'disk'
    if (imagenDisk) {
      // Agrega la clase deseada
      this.renderer.addClass(imagenDisk, 'editing');
    }
    const lugares = document.querySelectorAll('.lf4') as NodeListOf<HTMLInputElement>;

    lugares.forEach((lugar) => {
      this.renderer.addClass(lugar, 'edit');
      lugar.readOnly = false;
    });

  }
  validar(ficha: any):boolean{
    let validaciones: string[] = [];
    
    if(ficha[0].numero_rvoe==''){
      validaciones.push("numero_rvoe");
    }
    if(ficha[0].fecha_rvoe==''){
      validaciones.push("fecha_rvoe");
    }
    if(ficha[0].instituto_rvoe==''){
      validaciones.push("instituto_rvoe");
    }
    if(ficha[0].objetivos_estrategicos==''){
      validaciones.push("objetivos estrategicos");
    }
    if(ficha[0].mision==''){
      validaciones.push("mision");
    }
    if(ficha[0].vision==''){
      validaciones.push("vision");
    }
    if(ficha[0].documento_oficial==''){
      validaciones.push("documeto oficial");
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
      const authEndpoint = `${this.server}/api/Informe4/Actualizar_Informe4`;
      const authData = {
        "id_informe": this.ficha[0].id_informe,
        "id_carrera": this.carrera,
        "documento_oficial": this.ficha[0].documento_oficial,
        "numero_rvoe": this.ficha[0].numero_rvoe,
        "fecha_rvoe": this.ficha[0].fecha_rvoe,
        "instituto_rvoe": this.ficha[0].instituto_rvoe,
        "mision": this.ficha[0].mision,
        "vision": this.ficha[0].vision,
        "objetivos_estrategicos": this.ficha[0].objetivos_estrategicos
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
          this.getficha();
        }, (error) => {
          console.error('Error:', error);
        });
      const imagenDisk = document.querySelector(`.disk4`) as HTMLImageElement;

      // Verifica si se encontró la imagen 'disk'
      if (imagenDisk) {
        // Agrega la clase deseada
        this.renderer.removeClass(imagenDisk, 'editing');
      }
      const lugares = document.querySelectorAll('.lf4') as NodeListOf<HTMLInputElement>;

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
  private async loadData() {
    this.server = this.storage.getDataItem('server') || '';
  }
  ngOnInit(): void {
    this.loadData();
    this.getficha();
    const lugares = document.querySelectorAll('.lf4') as NodeListOf<HTMLInputElement>;

    lugares.forEach((lugar) => {
      lugar.readOnly = true;
    });

  }
}
