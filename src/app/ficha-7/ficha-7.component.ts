import { Component, Renderer2, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-ficha-7',
  templateUrl: './ficha-7.component.html',
  styleUrls: ['./ficha-7.component.css']
})
export class Ficha7Component {
  constructor(private http: HttpClient,private renderer: Renderer2, private storage : StorageServiceService) { 
    this.carrera = '';
  }
  @Input() carrera: string;
  ficha: any[] = [];
  server='';
  getficha(){
    const authEndpoint = `${this.server}/api/Informe7/Consultar_Informe7?id_carrera=${this.carrera}`;

  
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
    const imagenDisk = document.querySelector(`.disk7`) as HTMLImageElement;

    // Verifica si se encontró la imagen 'disk'
    if (imagenDisk) {
      // Agrega la clase deseada
      this.renderer.addClass(imagenDisk, 'editing');
    }
    const lugares = document.querySelectorAll('.lf7') as NodeListOf<HTMLInputElement>;

    lugares.forEach((lugar) => {
      this.renderer.addClass(lugar, 'edit');
      lugar.readOnly = false;
    });

  }
  editarficha(){
    const authEndpoint = `${this.server}/api/Informe7/Actualizar_Informe7`;
    const car = parseInt(this.carrera);
    let authData = {
      "id_informe": this.ficha[0].id_informe,
      "id_carrera": car,
      "ultima_estudiantes_ingresados": this.ficha[0].ultima_estudiantes_ingresados,
      "ultima_decersion": this.ficha[0].ultima_decersion,
      "ultima_indice_decersion": 0,
      "ultima_reprobacion": this.ficha[0].ultima_reprobacion,
      "ultima_indice_reprobacion": 0,
      "ultima_egresados": 0,
      "ultima_indice_eficiencia": 0,
      "ultima_titulados": this.ficha[0].ultima_titulados,
      "ultima_indice_titulacion": 0,
      "ultima_indice_neto": 0,
      "penul_estudiantes_ingresados": this.ficha[0].penul_estudiantes_ingresados,
      "penul_decersion": this.ficha[0].penul_decersion,
      "penul_indice_decersion": 0,
      "penul_reprobacion": this.ficha[0].penul_reprobacion,
      "penul_indice_reprobacion": 0,
      "penul_egresados": 0,
      "penul_indice_eficiencia": 0,
      "penul_titulados": this.ficha[0].penul_titulados,
      "penul_indice_titulacion": 0,
      "penul_indice_neto": 0,
      "ante_estudiantes_ingresados": this.ficha[0].ante_estudiantes_ingresados,
      "ante_decersion": this.ficha[0].ante_decersion,
      "ante_indice_decersion": 0,
      "ante_reprobacion": this.ficha[0].ante_reprobacion,
      "ante_indice_reprobacion": 0,
      "ante_egresados": 0,
      "ante_indice_eficiencia": 0,
      "ante_titulados": this.ficha[0].ante_titulados,
      "ante_indice_titulacion": 0,
      "ante_indice_neto": 0
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
        console.log(response);
        this.getficha();
      }, (error) => {
        console.error('Error:', error);
      });
    const imagenDisk = document.querySelector(`.disk7`) as HTMLImageElement;

    // Verifica si se encontró la imagen 'disk'
    if (imagenDisk) {
      // Agrega la clase deseada
      this.renderer.removeClass(imagenDisk, 'editing');
    }
    const lugares = document.querySelectorAll('.lf7') as NodeListOf<HTMLInputElement>;

    lugares.forEach((lugar) => {
      this.renderer.removeClass(lugar, 'edit');
      lugar.readOnly = true;
    });
  }
  minMax(accion:any){
    if(accion.meta_alcanzada>100){
      accion.meta_alcanzada =100;
    }else if(accion.meta_alcanzada<1){
      accion.meta_alcanzada =1;
    }
  }
  ngOnInit(): void {
    this.server = this.storage.getDataItem('server') ?? '';
    this.getficha();
    const lugares = document.querySelectorAll('.lf7') as NodeListOf<HTMLInputElement>;
    const porcentajes = document.querySelectorAll('.por') as NodeListOf<HTMLInputElement>;

    lugares.forEach((lugar) => {
      lugar.readOnly = true;
    });
    porcentajes.forEach((porcentaje) => {
      porcentaje.readOnly = true;
    })

  }
}
