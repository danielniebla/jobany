import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageServiceService } from '../storage-service.service';
@Component({
  selector: 'app-ficha-2',
  templateUrl: './ficha-2.component.html',
  styleUrls: ['./ficha-2.component.css']
})
export class Ficha2Component implements OnInit {
  constructor(private http: HttpClient,private renderer: Renderer2, private storage : StorageServiceService) { }
  ficha: any[] = [];
  server='';
  carrera=0;
  mensaje='';
  getficha(){
    const authEndpoint = `${this.server}/api/Informe2/Consultar_Informe2?id_informe=1`;

  
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
          this.ficha = response
        }, (error) => {
          console.error('Error:', error);
        });
  }
  editar() {
    const imagenDisk = document.querySelector(`.disk2`) as HTMLImageElement;

    // Verifica si se encontró la imagen 'disk'
    if (imagenDisk) {
      // Agrega la clase deseada
      this.renderer.addClass(imagenDisk, 'editing');
    }
    const lugares = document.querySelectorAll('.lf2') as NodeListOf<HTMLInputElement>;

    lugares.forEach((lugar) => {
      this.renderer.addClass(lugar, 'edit');
      lugar.readOnly = false;
    });

  }
  validar(ficha: any):boolean{
    let validaciones: string[] = [];
    
    if(ficha[0].mision==''){
      validaciones.push("mision");
    }
    if(ficha[0].vision==''){
      validaciones.push("vision");
    }
    if(ficha[0].politicas==''){
      validaciones.push("politicas");
    }
    if(ficha[0].lineas_estrategicas==''){
      validaciones.push("lineas estrategias");
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
      const authEndpoint = `${this.server}/api/Informe2/Actualizar_Informe2`;
        const authData = {
          "id_informe": 1,
          "nombre": "UNIVERSIDAD AUTONOMA DE SINALOA",
          "id_carrera": 1,
          "mision": this.ficha[0].mision,
          "vision": this.ficha[0].vision,
          "politicas": this.ficha[0].politicas,
          "lineas_estrategicas": this.ficha[0].lineas_estrategicas
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
        const imagenDisk = document.querySelector(`.disk2`) as HTMLImageElement;

      // Verifica si se encontró la imagen 'disk'
      if (imagenDisk) {
        // Agrega la clase deseada
        this.renderer.removeClass(imagenDisk, 'editing');
      }
      const lugares = document.querySelectorAll('.lf2') as NodeListOf<HTMLInputElement>;

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
    const lugares = document.querySelectorAll('.lf2') as NodeListOf<HTMLInputElement>;

    lugares.forEach((lugar) => {
      lugar.readOnly = true;
    });

  }
}
