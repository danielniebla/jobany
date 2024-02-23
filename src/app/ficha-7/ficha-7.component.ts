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
  mensaje='';
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
  validar(ficha: any):boolean{
    let validaciones: string[] = [];
    let val: string[] = [];
    let ult= 0, penul= 0, ante = 0;
    
    if(ficha[0].ultima_decersion==''){
      validaciones.push("desercion ultima generacion");
    }else{
      ult +=parseInt(ficha[0].ultima_decersion);
    }
    if(ficha[0].ultima_reprobacion==''){
      validaciones.push("reprobacion ultima generacion");
    }else{
      ult += parseInt(ficha[0].ultima_reprobacion);
    }
    if(ficha[0].ultima_estudiantes_ingresados==''){
      validaciones.push("estudiantes ingresados ultima generacion");
    }else{
      if(ult>parseInt(ficha[0].ultima_estudiantes_ingresados)){
        val.push(" no puede haber mas desercion y reprobados que ingreso.(penul) ")
      }
    }

    
    if(ficha[0].penul_decersion==''){
      validaciones.push("desercion penultima generacion");
    }else{
      penul +=parseInt(ficha[0].penul_decersion);
    }
    if(ficha[0].penul_reprobacion==''){
      validaciones.push("reprobacion penultima generacion");
    }else{
      penul += parseInt(ficha[0].penul_reprobacion);
    }
    if(ficha[0].penul_estudiantes_ingresados==''){
      validaciones.push("estudiantes ingresados penultima generacion");
    }else{
      if(ult>parseInt(ficha[0].penul_estudiantes_ingresados)){
        val.push(" no puede haber mas desercion y reprobados que ingreso.(penultima) ")
      }
    }

    
    if(ficha[0].ante_decersion==''){
      validaciones.push("desercion antetima generacion");
    }else{
      ante +=parseInt(ficha[0].ante_decersion);
    }
    if(ficha[0].ante_reprobacion==''){
      validaciones.push("reprobacion antetima generacion");
    }else{
      ante += parseInt(ficha[0].ante_reprobacion);
    }
    if(ficha[0].ante_estudiantes_ingresados==''){
      validaciones.push("estudiantes ingresados antetima generacion");
    }else{
      if(ult>parseInt(ficha[0].ante_estudiantes_ingresados)){
        val.push(" no puede haber mas desercion y reprobados que ingreso.(antepenultima) ")
      }
    }

    if(validaciones.length !=0){
      this.mensaje = 'los campos: '+ validaciones.join(", ") + ' estan vacios.';
      return false;
    }else{
      if(val.length !=0){
        this.mensaje = val.join(", ");
        return false;
      }else{
        return true;
      }
    }
  }
  editarficha(){
    if(this.validar(this.ficha)){
    const authEndpoint = `${this.server}/api/Informe7/Actualizar_Informe7`;
    const car = parseInt(this.carrera);
    let authData = {
      "id_informe": this.ficha[0].id_informe,
      "id_carrera": car,
      "ultima_estudiantes_ingresados": this.ficha[0].ultima_estudiantes_ingresados,
      "ultima_decersion": this.ficha[0].ultima_decersion,
      "ultima_reprobacion": this.ficha[0].ultima_reprobacion,
      "ultima_titulados": this.ficha[0].ultima_titulados,
      "penul_estudiantes_ingresados": this.ficha[0].penul_estudiantes_ingresados,
      "penul_decersion": this.ficha[0].penul_decersion,
      "penul_reprobacion": this.ficha[0].penul_reprobacion,
      "penul_titulados": this.ficha[0].penul_titulados,
      "ante_estudiantes_ingresados": this.ficha[0].ante_estudiantes_ingresados,
      "ante_decersion": this.ficha[0].ante_decersion,
      "ante_reprobacion": this.ficha[0].ante_reprobacion,
      "ante_titulados": this.ficha[0].ante_titulados,
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
        this.getficha();
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
