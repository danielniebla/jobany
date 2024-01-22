import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,private http: HttpClient, private storage : StorageServiceService) { }
  nombre='';
  contrasena='';
  server = 'https://adminuas.uas-proy.com';
  autenticarUsuario() {
    const spanElement: HTMLElement | null = document.getElementById('error')!;
    const authEndpoint = `${this.server}/api/Usuarios/autenticacion`;

    // Datos para enviar
    const authData = {
      id_carrera: 0,
      id_facultad:0,
      correo: this.nombre,
      clave: this.contrasena
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
        const token = response.token; // Suponiendo que el token se devuelve como parte de la respuesta
        const usuario = response.usuario[0]; // Acceder al primer usuario de la respuesta (puede haber más)
        const idCarrera = usuario.id_carrera; 
        const idf =usuario.id_facultad;
        const idu = usuario.id_usuario; // Obtener el id_carrera de la respuesta
        console.log(response);
        // Guardar id_carrera en localStorage 
        this.storage.setDataItem('token', token);
        this.storage.setDataItem('idCarrera', idCarrera);
        this.storage.setDataItem('idFacultad', idf);
        this.storage.setDataItem('idUsuario', idu);
        if(token!=''){
          setTimeout(() => {
            window.location.href = 'https://yobani.onrender.com/';
          }, 300);
        }else{
          spanElement.textContent = 'no se encontraron coincidencias usuario-contraseña';
          setTimeout(function() {
            spanElement.textContent = '';
          }, 6000);
        }

      }, (error) => {
        console.error('Error:', error);
        spanElement.textContent = 'es necesario llenar todos los campos';
      });
      
    }

    ngOnInit(): void {
      this.storage.setDataItem('server', this.server);
      const user = this.storage.getDataItem('idUsuario') ?? '';
      if(user != ''){
        setTimeout(() => {
          this.router.navigate(['/Sursumversus']);
        }, 200);

      }
    }
}