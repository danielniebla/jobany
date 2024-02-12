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
    const authEndpoint = `${this.server}/api/Informe5/Actualizar_Informe5`;
    const car = parseInt(this.carrera);
    let authData = {
      "id_informe": this.ficha[0].id_informe,
      "id_carrera": car,
      "ultima_hombres_nuevo": this.ficha[0].ultima_hombres_nuevo,
      "ultima_mujeres_nuevo": this.ficha[0].ultima_mujeres_nuevo,
      "ultima_hombres_reingreso": this.ficha[0].ultima_hombres_reingreso,
      "ultima_mujeres_reingreso": this.ficha[0].ultima_mujeres_reingreso,
      "penul_hombres_nuevo": this.ficha[0].penul_hombres_nuevo,
      "penul_mujeres_nuevo": this.ficha[0].penul_mujeres_nuevo,
      "penul_hombres_reingreso": this.ficha[0].penul_hombres_reingreso,
      "penul_mujeres_reingreso": this.ficha[0].penul_mujeres_reingreso,
      "ante_hombres_nuevo": this.ficha[0].ante_hombres_nuevo,
      "ante_mujeres_nuevo": this.ficha[0].ante_mujeres_nuevo,
      "ante_hombres_reingreso": this.ficha[0].ante_hombres_reingreso,
      "ante_mujeres_reingreso": this.ficha[0].ante_mujeres_reingreso,
      "hombres_ultima": this.ficha[0].hombres_ultima,
      "mujeres_ultima": this.ficha[0].mujeres_ultima,
      "hombres_penul": this.ficha[0].hombres_penul,
      "mujeres_penul": this.ficha[0].mujeres_penul,
      "hombres_ante": this.ficha[0].hombres_ante,
      "mujeres_ante": this.ficha[0].mujeres_ante,
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
