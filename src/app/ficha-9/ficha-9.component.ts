import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageServiceService } from '../storage-service.service';
@Component({
  selector: 'app-ficha-9',
  templateUrl: './ficha-9.component.html',
  styleUrls: ['./ficha-9.component.css']
})
export class Ficha9Component {
  constructor(private http: HttpClient,private renderer: Renderer2, private storage : StorageServiceService) {
    this.carrera = '';
   }
  @Input() carrera: string;
  ficha: any[] = [];
  server='';
  getficha(){
    const authEndpoint = `${this.server}/api/Informe9/Consultar_Informe9?id_carrera=${this.carrera}`;

  
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
    const imagenDisk = document.querySelector(`.disk9`) as HTMLImageElement;

    // Verifica si se encontró la imagen 'disk'
    if (imagenDisk) {
      // Agrega la clase deseada
      this.renderer.addClass(imagenDisk, 'editing');
    }
    const lugares = document.querySelectorAll('.lf9') as NodeListOf<HTMLInputElement>;

    lugares.forEach((lugar) => {
      this.renderer.addClass(lugar, 'edit');
      lugar.readOnly = false;
    });

  }
  editarficha(){
    const authEndpoint = `${this.server}/api/Informe9/Actualizar_Informe9`;
      const authData = {
        "id_informe": this.ficha[0].id_informe,
        "id_carrera": this.ficha[0].id_carrera,
        "nombre": this.ficha[0].nombre,
        "correo": this.ficha[0].correo,
        "telefonos": this.ficha[0].telefonos
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
      const imagenDisk = document.querySelector(`.disk9`) as HTMLImageElement;

    // Verifica si se encontró la imagen 'disk'
    if (imagenDisk) {
      // Agrega la clase deseada
      this.renderer.removeClass(imagenDisk, 'editing');
    }
    const lugares = document.querySelectorAll('.lf9') as NodeListOf<HTMLInputElement>;

    lugares.forEach((lugar) => {
      this.renderer.removeClass(lugar, 'edit');
      lugar.readOnly = true;
    });
  }
  private async loadData() {
    this.server = this.storage.getDataItem('server') || '';
  }
  ngOnInit(): void {
    this.loadData();
    this.getficha();
    const lugares = document.querySelectorAll('.lf9') as NodeListOf<HTMLInputElement>;

    lugares.forEach((lugar) => {
      lugar.readOnly = true;
    });

  }
}
