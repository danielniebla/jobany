import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ficha-3',
  templateUrl: './ficha-3.component.html',
  styleUrls: ['./ficha-3.component.css']
})
export class Ficha3Component implements OnInit {
  constructor(private http: HttpClient,private renderer: Renderer2) { }
  ficha: any[] = [];
  server='';
  carrera=0;
  faculta='';
  getficha(){
    const authEndpoint = `${this.server}/api/Informe3/Consultar_Informe3?id_carrera=${this.carrera}`;
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
  editarficha(){
    const authEndpoint = `${this.server}/api/Informe3/Actualizar_Informe3`;
      const authData = {
        "id_informe": this.ficha[0].id_informe,
        "id_carrera": this.carrera,
        "nombre": this.ficha[0].nombre,
        "campus": this.ficha[0].campus,
        "fecha_inicio": this.ficha[0].fecha_inicio,
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
          this.ficha = response
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
  }
  facultad(){
    const facu = localStorage.getItem('idFacultad');
    const authEndpoint = `${this.server}/api/Facultades/Consultar_Facultad?id_facultad=${facu}`;

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
        this.faculta = response[0].nombre;
      }, (error) => {
        console.error('Error:', error);
      });
  }
  ngOnInit(): void {
    this.server = localStorage.getItem('server') ?? '';
    const car = localStorage.getItem('idFacultad') ?? '';
    this.carrera = parseInt(car);
    this.getficha();
    const lugares = document.querySelectorAll('.lf3') as NodeListOf<HTMLInputElement>;

    lugares.forEach((lugar) => {
      lugar.readOnly = true;
    });
    this.facultad()

  }
}
