import { Component, Renderer2, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-ficha-5',
  templateUrl: './ficha-5.component.html',
  styleUrls: ['./ficha-5.component.css']
})
export class Ficha5Component {
  constructor(private http: HttpClient,private renderer: Renderer2, private storage : StorageServiceService) { 
    this.carrera = '';
  }
  @Input() carrera: string;
  ficha: any[] = [];
  server='';
  getficha(){
    const authEndpoint = `${this.server}/api/Informe5/Consultar_Informe5?id_carrera=${this.carrera}`;
  
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
          console.log('ok',response);

        }, (error) => {
          console.error('Error:', error);
        });
  }
  editar() {
    const imagenDisk = document.querySelector(`.disk5`) as HTMLImageElement;

    // Verifica si se encontró la imagen 'disk'
    if (imagenDisk) {
      // Agrega la clase deseada
      this.renderer.addClass(imagenDisk, 'editing');
    }
    const lugares = document.querySelectorAll('.lf5') as NodeListOf<HTMLInputElement>;

    lugares.forEach((lugar) => {
      this.renderer.addClass(lugar, 'edit');
      lugar.readOnly = false;
    });

  }
  editarficha(){
    const authEndpoint = `${this.server}/api/Informe5/Actualizar_Informe5`;
    const car = parseInt(this.carrera);
    const authData = {
      "id_informe": this.ficha[0].id_informe,
      "id_carrera": car,
      "tiempo_completo": this.ficha[0].tiempo_completo,
      "tres_cuartos": this.ficha[0].tres_cuartos,
      "medio_tiempo": this.ficha[0].medio_tiempo,
      "asignatura": this.ficha[0].asignatura,
      "tsu": this.ficha[0].tsu,
      "pa": this.ficha[0].pa,
      "l": this.ficha[0].l,
      "e": this.ficha[0].e,
      "m": this.ficha[0].m,
      "d": this.ficha[0].d,
      "total_1": this.ficha[0].total_1,
      "total_2": this.ficha[0].total_2
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
    const imagenDisk = document.querySelector(`.disk5`) as HTMLImageElement;

    // Verifica si se encontró la imagen 'disk'
    if (imagenDisk) {
      // Agrega la clase deseada
      this.renderer.removeClass(imagenDisk, 'editing');
    }
    const lugares = document.querySelectorAll('.lf5') as NodeListOf<HTMLInputElement>;

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
    const lugares = document.querySelectorAll('.lf5') as NodeListOf<HTMLInputElement>;
    const porcentajes = document.querySelectorAll('.por') as NodeListOf<HTMLInputElement>;
    lugares.forEach((lugar) => {
      lugar.readOnly = true;
    });
    porcentajes.forEach((porcentaje) => {
      porcentaje.readOnly = true;
    })

  }
}
