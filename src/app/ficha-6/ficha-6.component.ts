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
  mensaje='';
  getficha(){
    const authEndpoint = `${this.server}/api/Informe6/Consultar_Informe6?id_carrera=${this.carrera}`;
  
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
  validar(ficha: any):boolean{
    let validaciones: string[] = [];
    
    if(ficha[0].ultima_hombres_nuevo.toString()==''){
      validaciones.push("ultima hombre nuevo");
    }
    if(ficha[0].ultima_mujeres_nuevo.toString()==''){
      validaciones.push("ultima_mujeres_nuevo");
    }
    if(ficha[0].ultima_hombres_reingreso.toString()==''){
      validaciones.push("ultima_hombres_reingreso");
    }
    if(ficha[0].ultima_mujeres_reingreso.toString()==''){
      validaciones.push("ultima_mujeres_reingreso");
    }
    if(ficha[0].penul_hombres_nuevo.toString()==''){
      validaciones.push("penultima hombre nuevo");
    }
    if(ficha[0].penul_mujeres_nuevo.toString()==''){
      validaciones.push("penultima_mujeres_nuevo");
    }
    if(ficha[0].penul_hombres_reingreso.toString()==''){
      validaciones.push("penultima_hombres_reingreso");
    }
    if(ficha[0].penul_mujeres_reingreso.toString()==''){
      validaciones.push("penultima_mujeres_reingreso");
    }
    if(ficha[0].ante_hombres_nuevo.toString()==''){
      validaciones.push("ante hombre nuevo");
    }
    if(ficha[0].ante_mujeres_nuevo.toString()==''){
      validaciones.push("ante_mujeres_nuevo");
    }
    if(ficha[0].ante_hombres_reingreso.toString()==''){
      validaciones.push("ante_hombres_reingreso");
    }
    if(ficha[0].ante_mujeres_reingreso.toString()==''){
      validaciones.push("ante_mujeres_reingreso");
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
      const authEndpoint = `${this.server}/api/Informe6/Actualizar_Informe6`;
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
    }else{
      window.alert(this.mensaje);
      setTimeout(() => {
        this.mensaje='';
      }, 100);
    }
  }
  minMax(accion:any){
    if(accion.meta_alcanzada>100){
      accion.meta_alcanzada =100;
    }else if(accion.meta_alcanzada<1){
      accion.meta_alcanzada =1;
    }
  }
  private async loadData() {
    this.server = this.storage.getDataItem('server') || '';
  }
  ngOnInit(): void {
    this.loadData();
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
