import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,private http: HttpClient) { }
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
        localStorage.setItem('idCarrera', idCarrera);
        localStorage.setItem('token',token);
        console.log('aaaaa', token);
        localStorage.setItem('idFacultad', idf );
        localStorage.setItem('idUsuario', idu );
        if(token!=''){
          window.location.reload()
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
      localStorage.setItem('server',this.server);
      const user =localStorage.getItem('idUsuario');
      if(user){
        this.router.navigate(['/Sursumversus']);
      }
    }
}