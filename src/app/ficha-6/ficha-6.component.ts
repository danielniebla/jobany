import { Component, Renderer2, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-ficha-6',
  templateUrl: './ficha-6.component.html',
  styleUrls: ['./ficha-6.component.css']
})
export class Ficha6Component {
  constructor(private http: HttpClient,private renderer: Renderer2, private storage : StorageServiceService) { 
    this.carrera = '';
  }
  @Input() carrera: string;
  ficha: any[] = [];
  server='';
  getficha(){
    const authEndpoint = `${this.server}/api/Informe6/Consultar_Informe6?id_carrera=${this.carrera}`;
    console.log('aa',authEndpoint);
  
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
    const imagenDisk = document.querySelector(`.disk6`) as HTMLImageElement;

    // Verifica si se encontró la imagen 'disk'
    if (imagenDisk) {
      // Agrega la clase deseada
      this.renderer.addClass(imagenDisk, 'editing');
    }
    const lugares = document.querySelectorAll('.lf6') as NodeListOf<HTMLInputElement>;

    lugares.forEach((lugar) => {
      this.renderer.addClass(lugar, 'edit');
      lugar.readOnly = false;
    });

  }
  editarficha(){
    const authEndpoint = `${this.server}/api/Informe6/Actualizar_Informe6`;
    const car = parseInt(this.carrera);
    let authData = {
      "id_informe": this.ficha[0].id_informe,
      "id_carrera": car,
      "ultima_hombres_nuevo": this.ficha[0].ultima_hombres_nuevo,
      "ultima_hombres_nuevo_por": 0,
      "ultima_mujeres_nuevo": this.ficha[0].ultima_mujeres_nuevo,
      "ultima_mujeres_nuevo_por": 0,
      "ultima_subtotal_nuevo": 0,
      "ultima_subtotal_nuevo_por": 0,
      "ultima_hombres_reingreso": this.ficha[0].ultima_hombres_reingreso,
      "ultima_hombres_reingreso_por": 0,
      "ultima_mujeres_reingreso": this.ficha[0].ultima_mujeres_reingreso,
      "ultima_mujeres_reingreso_por": 0,
      "ultima_subtotal_reingreso": 0,
      "ultima_subtotal_reingreso_por": 0,
      "penul_hombres_nuevo": this.ficha[0].penul_hombres_nuevo,
      "penul_hombres_nuevo_por": 0,
      "penul_mujeres_nuevo": this.ficha[0].penul_mujeres_nuevo,
      "penul_mujeres_nuevo_por": 0,
      "penul_subtotal_nuevo": 0,
      "penul_subtotal_nuevo_por": 0,
      "penul_hombres_reingreso": this.ficha[0].penul_hombres_reingreso,
      "penul_hombres_reingreso_por": 0,
      "penul_mujeres_reingreso": this.ficha[0].penul_mujeres_reingreso,
      "penul_mujeres_reingreso_por": 0,
      "penul_subtotal_reingreso": 0,
      "penul_subtotal_reingreso_por": 0,
      "ante_hombres_nuevo": this.ficha[0].ante_hombres_nuevo,
      "ante_hombres_nuevo_por": 0,
      "ante_mujeres_nuevo": this.ficha[0].ante_mujeres_nuevo,
      "ante_mujeres_nuevo_por": 0,
      "ante_subtotal_nuevo": 0,
      "ante_subtotal_nuevo_por": 0,
      "ante_hombres_reingreso": this.ficha[0].ante_hombres_reingreso,
      "ante_hombres_reingreso_por": 0,
      "ante_mujeres_reingreso": this.ficha[0].ante_mujeres_reingreso,
      "ante_mujeres_reingreso_por": 0,
      "ante_subtotal_reingreso": 0,
      "ante_subtotal_reingreso_por": 0,
      "hombres_ultima": 0,
      "mujeres_ultima": 0,
      "suma_ultima": 0,
      "hombres_ultima_por": 0,
      "mujeres_ultima_por": 0,
      "hombres_penul": 0,
      "mujeres_penul": 0,
      "suma_penul": 0,
      "hombres_penul_por": 0,
      "mujeres_penul_por": 0,
      "hombres_ante": 0,
      "mujeres_ante": 0,
      "suma_ante": 0,
      "hombres_ante_por": 0,
      "mujeres_ante_por": 0
    };
    console.log('a',authData);
  
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
    const imagenDisk = document.querySelector(`.disk6`) as HTMLImageElement;

    // Verifica si se encontró la imagen 'disk'
    if (imagenDisk) {
      // Agrega la clase deseada
      this.renderer.removeClass(imagenDisk, 'editing');
    }
    const lugares = document.querySelectorAll('.lf6') as NodeListOf<HTMLInputElement>;

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
    const lugares = document.querySelectorAll('.lf6') as NodeListOf<HTMLInputElement>;
    const porcentajes = document.querySelectorAll('.por') as NodeListOf<HTMLInputElement>;

    lugares.forEach((lugar) => {
      lugar.readOnly = true;
    });
    porcentajes.forEach((porcentaje) => {
      porcentaje.readOnly = true;
    })

  }
}
