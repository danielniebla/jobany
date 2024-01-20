import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ficha-1',
  templateUrl: './ficha-1.component.html',
  styleUrls: ['./ficha-1.component.css']
})
export class Ficha1Component implements OnInit {
  constructor(private http: HttpClient,private renderer: Renderer2) { }
  ficha: any[] = [];
  server='';
  carrera=0;
  getficha(){
    const authEndpoint = `${this.server}/api/Informe/Consultar_Informe1?id_carrera=${this.carrera}`;
      /*const authData = {
        "id_cumplimiento": accion.id_cumplimiento,
        "id_pregunta": accion.id_pregunta,
        "id_recomendacion": accion.id_recomendacion,
        "acciones_realizadas": accion.acciones_realizadas,
        "fecha": accion.fecha,
        "meta_alcanzada": accion.meta,
        "documentos": accion.documentos
      };*/
  
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
    const authEndpoint = `${this.server}/api/Informe/Actualizar_Informe1`;
      const authData = {
        "id_informe": 0,
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
  }
  ngOnInit(): void {
    this.server = localStorage.getItem('server') ?? '';
    const car = localStorage.getItem('idCarrera') ?? '';
    this.carrera = parseInt(car);
    this.getficha();
    const lugarf = document.querySelector(`.lf`) as HTMLInputElement;
    if (lugarf) {
      lugarf.readOnly = true;
    }
  }
}
