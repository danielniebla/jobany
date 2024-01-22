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
  getficha(){
    const authEndpoint = `${this.server}/api/Informe2/Consultar_Informe2?id_carrera=${this.carrera}`;
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
  editarficha(){
    const authEndpoint = `${this.server}/api/Informe/Actualizar_Informe2`;
      const authData = {
        "id_informe": this.ficha[0].id_informe,
        "id_carrera": this.carrera,
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
  }
  ngOnInit(): void {
    this.server = this.storage.getDataItem('server') ?? '';
    const car = this.storage.getDataItem('idCarrera') ?? '';
    this.carrera = parseInt(car);
    this.getficha();
    const lugares = document.querySelectorAll('.lf2') as NodeListOf<HTMLInputElement>;

    lugares.forEach((lugar) => {
      lugar.readOnly = true;
    });

  }
}