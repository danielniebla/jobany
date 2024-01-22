import { Component, OnInit , Renderer2, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-crud-users',
  templateUrl: './crud-users.component.html',
  styleUrls: ['./crud-users.component.css']
})
export class CrudUsersComponent {
  constructor(private router: Router,private http: HttpClient, private cdRef: ChangeDetectorRef,private renderer: Renderer2, private storage : StorageServiceService) { }
  users: any[] = [];
  facultades: any [] = [];
  carreras: any [] = [];
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
  selectedzona2:{[key:number]:number}={};
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
    const camps = document.querySelectorAll(`.campo[data-index="${idRecomendacion}"]`);
    camps.forEach((camp) => {
      this.renderer.addClass(camp as HTMLElement, 'new');
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
        "id_usuario": idRecomendacion,
        "id_carrera": 0,
        "id_facultad": 0,
        "correo": "string",
        "clave": "string",
        "nombre": "string",
        "puesto": "string",
        "fecha_alta": "2024-01-22T08:05:04.096Z"
      };
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'accept': '*/*' // Agregar el encabezado de aceptación, según lo esperado
        }),
        body: recomendacionAEliminar // Agregar el cuerpo de la solicitud con los datos a eliminar
      };
      
      this.http.delete(`${this.server}/api/Usuarios/Eliminar_Usuario`, httpOptions)
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
        this.actualizarDatoscarrera();
        this.actualizarDatosfacultad();
      }, (error) => {
        console.error('Error:', error);
      });
      
  }
  ngOnInit(): void {
    this.server = this.storage.getDataItem('server') ?? '';
    this.actualizarDatosRecomendacion();    
  }
  actualizarRecomendacion(user: any) {
    if(this.selectedzona2[user.id_usuario] != 0 && this.selectedzona2[user.id_usuario] != null && this.selectedzona2[user.id_usuario] != 0 && this.selectedzona2[user.id_usuario] != null && user.correo != '' && user.clave != ''){
    const authEndpoint = `${this.server}/api/Usuarios/Actualizar_Usuario`;
  
    const authData = {
      id_usuario: user.id_usuario,
      id_carrera: this.selectedzona2[user.id_usuario],
      id_facultad: this.selectedzona[user.id_usuario],
      correo: user.correo,
      clave: user.clave,
      nombre: 'string',
      puesto: 'string',
      fecha_alta: '2024-01-22T08:05:04.096Z'
    };
    console.log(authData);
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
  
    this.http.post(authEndpoint, authData, httpOptions)
      .subscribe(
        (response: any) => {
          // Manejar respuesta exitosa
          this.rebote();
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }else{
      window.alert('favor de llenar todos los datos antes de guardar');
    }
  }
  rebote(){
    setTimeout(() => {
      this.actualizarDatosRecomendacion();
    }, 300);
    
  }
  nuevaRecomendacion(){
    if(this.selectedzona2[0] != 0 && this.selectedzona2[0] != null && this.selectedzona2[0] != 0 && this.selectedzona2[0] != null && this.usuario != '' && this.contrasena != ''){
    const authEndpoint = `${this.server}/api/Usuarios/Agregar_Usuarios`;
    const authData = 
    {
      "id_usuario": 0,
      "id_carrera": this.selectedzona2[0],
      "id_facultad": this.selectedzona[0],
      "correo": this.usuario,
      "clave": this.contrasena,
      "nombre": "string",
      "puesto": "string",
      "fecha_alta": "2023-12-01T06:46:57.562Z"
    };
    console.log(authData);
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
    }else{
      window.alert('llenar todos los campos antes de guardar');
    }
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
  actualizarDatoscarrera(){
    const authEndpoint = `${this.server}/api/Carreras/Consultar_Carrera`;

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
        this.carreras= response;
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
  carrera(idUsuario: number) {
    const usuario = this.users.find(usuario => usuario.id_usuario === idUsuario);

    if (usuario) {
      const carreraCorrespondiente = this.carreras.find(carrera => carrera.id_carrera === usuario.id_carrera);
      return carreraCorrespondiente ? carreraCorrespondiente.nombre : 'No encontrado';
    }
  
    return 'No encontrado';
  }
}