import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageServiceService } from '../storage-service.service';
@Component({
  selector: 'app-ficha-8',
  templateUrl: './ficha-8.component.html',
  styleUrls: ['./ficha-8.component.css']
})
export class Ficha8Component {
  constructor(private http: HttpClient,private renderer: Renderer2, private storage : StorageServiceService) {
    this.carrera = '';
   }
  @Input() carrera: string;
  ficha: any[] = [];
  server='';
  mensaje ='';
  getficha(){
    const authEndpoint = `${this.server}/api/Informe8/Consultar_Informe8?id_carrera=${this.carrera}`;

  
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
    const imagenDisk = document.querySelector(`.disk8`) as HTMLImageElement;

    // Verifica si se encontró la imagen 'disk'
    if (imagenDisk) {
      // Agrega la clase deseada
      this.renderer.addClass(imagenDisk, 'editing');
    }
    const lugares = document.querySelectorAll('.lf8') as NodeListOf<HTMLInputElement>;

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
    if(ficha[0].cargo==''){
      validaciones.push("cargo");
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
      const authEndpoint = `${this.server}/api/Informe8/Actualizar_Informe8`;
        const authData = {
          "id_informe": this.ficha[0].id_informe,
          "id_carrera": this.ficha[0].id_carrera,
          "nombre": this.ficha[0].nombre,
          "cargo": this.ficha[0].cargo
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
        const imagenDisk = document.querySelector(`.disk8`) as HTMLImageElement;

      // Verifica si se encontró la imagen 'disk'
      if (imagenDisk) {
        // Agrega la clase deseada
        this.renderer.removeClass(imagenDisk, 'editing');
      }
      const lugares = document.querySelectorAll('.lf8') as NodeListOf<HTMLInputElement>;

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
    const lugares = document.querySelectorAll('.lf8') as NodeListOf<HTMLInputElement>;

    lugares.forEach((lugar) => {
      lugar.readOnly = true;
    });

  }
}
