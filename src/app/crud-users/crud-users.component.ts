import { Component, OnInit , Renderer2, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-users',
  templateUrl: './crud-users.component.html',
  styleUrls: ['./crud-users.component.css']
})
export class CrudUsersComponent {
  constructor(private router: Router,private http: HttpClient, private cdRef: ChangeDetectorRef,private renderer: Renderer2) { }
  users: any[] = [];
  facultades: any [] = [];
  nueva= false;
  usuario='';
  contrasena= '';
  tipo=0;
  alert=false;
  option: boolean | null | undefined;
  contador=0;
  time=10000;
  visi=false;
  ojito: { [key: number]: boolean } = {}
  selectedzona:{[key:number]:number}={};
  selctFlag:{[key:number]:boolean}={};
  server= '';
  toggleEye(){
    this.visi=!this.visi
  }
  
  toggleEyes(idRecomendacion: number){
    if(this.ojito[idRecomendacion]==null ||this.ojito[idRecomendacion]== false){
      this.ojito[idRecomendacion] = true;
    } else{
      this.ojito[idRecomendacion]=false;
    }
  }
  editarRecomendacion(idRecomendacion: number) {

      this.selctFlag[idRecomendacion] = true;
    const imagenDisk = document.querySelector(`.disk[data-index="${idRecomendacion}"]`) as HTMLImageElement;

    // Verifica si se encontró la imagen 'disk'
    if (imagenDisk) {
      // Agrega la clase deseada
      this.renderer.addClass(imagenDisk, 'edit');
    }
    const textAreas = document.querySelectorAll(`.txtArea[data-index="${idRecomendacion}"]`);
    textAreas.forEach((textarea) => {
      this.renderer.removeClass(textarea as HTMLElement, 'txtArea');
    });
  }
  agregarRecomendacion() {
    this.nueva=true;
  }
  aceptarBorrado() {
    this.option = true;
  }
  
  cancelarBorrado() {
    this.option = false;
  }
  async eleccion(){
    if (this.option != null && this.option === true) {
      this.contador = 0;
      this.option = null;
    } else if (this.option != null && this.option === false) {
      this.alert = false;
      this.contador = 0;
      this.option = null;
    }
  }
  borrarRecomendacion(idRecomendacion: number){
    if(this.alert){
      const recomendacionAEliminar = {
        "id_user": idRecomendacion,
        "id_facultad": 0,
        "correo": "string",
        "clave": "string",
        "tipo": 0

      };
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'accept': '*/*' // Agregar el encabezado de aceptación, según lo esperado
        }),
        body: recomendacionAEliminar // Agregar el cuerpo de la solicitud con los datos a eliminar
      };
      
      this.http.delete(`${this.server}/api/Cumplimiento/Eliminar_Cumplimiento`, httpOptions)
        .subscribe(
          (response: any) => {
            // Manejar la respuesta aquí si es necesario
            this.actualizarDatosRecomendacion();
          },
          (error) => {
            // Manejar errores aquí
            console.error('Error:', error);
          }
        );
      
    }
    if(this.alert){
      this.alert=false;
    } 
  }
  verificarBorradoRecomendacion(idRecomendacion: number) {
    this.alert = true;
    this.contador = 10;
    const intervalo = setInterval(() => {
      if(this.contador==0){
        this.borrarRecomendacion(idRecomendacion);
        clearInterval(intervalo);
      }else{
        this.contador--;
        this.eleccion();
      }
    }, 1000);

  }
  
  actualizarDatosRecomendacion(){
    const url = `${this.server}/api/Usuarios/Consultar_Usuarios`;

    // Realizar la solicitud GET para obtener los datos
    this.http.get(url)
      .subscribe((response: any) => {
        // Manejar la respuesta del servidor aquí
        this.users = response;
      }, (error) => {
        console.error('Error:', error);
      });
      
  }
  ngOnInit(): void {
    this.server = localStorage.getItem('server') ?? '';
    this.actualizarDatosRecomendacion();
    this.actualizarDatosfacultad();
    
  }
  actualizarRecomendacion(user: any) {
    const authEndpoint = `${this.server}/api/Usuarios/Actualizar_Usuario`;
    const authData = 
    {
      "id_usuario": user.id_user,
      "id_carrera": 0,
      "id_facultad": user.id_facultad,
      "correo": user.correo,
      "clave": user.clave,
      "nombre": "string",
      "puesto": "string",
      "fecha_alta": "2023-12-01T06:46:57.562Z"
    };

    // Encabezados para la solicitud POST
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Realizar la solicitud POST para obtener el token
    this.http.post(authEndpoint, authData, httpOptions)
      .subscribe((response: any) => {
        // Aquí puedes manejar la respuesta del servidor
        this.rebote();
      }, (error) => {
        console.error('Error:', error);
      });

  }
  rebote(){
    setTimeout(() => {
      this.actualizarDatosRecomendacion();
    }, 500);
    
  }
  nuevaRecomendacion(){
    const authEndpoint = `${this.server}/api/Cumplimiento/Agregar_Cumplimiento`;
    const authData = 
    {
      "id_usuario": 0,
      "id_carrera": 0,
      "id_facultad": this.selectedzona[0],
      "correo": this.usuario,
      "clave": this.contrasena,
      "nombre": "string",
      "puesto": "string",
      "fecha_alta": "2023-12-01T06:46:57.562Z"
    };

    // Encabezados para la solicitud POST
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Realizar la solicitud POST para obtener el token
    this.http.post(authEndpoint, authData, httpOptions)
      .subscribe((response: any) => {
        // Aquí puedes manejar la respuesta del servidor
        this.rebote();
        this.nueva=false;
      }, (error) => {
        console.error('Error:', error);
      });
  }
  actualizarDatosfacultad(){
    const authEndpoint = `${this.server}/api/Facultades/Consultar_Facultad`;

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
        this.facultades= response;
      }, (error) => {
        console.error('Error:', error);
      });
      
  }
  zona(idUsuario: number) {
    const usuario = this.users.find(usuario => usuario.id_usuario === idUsuario);

    if (usuario) {
      const facultadCorrespondiente = this.facultades.find(facultad => facultad.id_facultad === usuario.id_facultad);
      return facultadCorrespondiente ? facultadCorrespondiente.nombre : 'No encontrado';
    }
  
    return 'No encontrado';
  }
}
