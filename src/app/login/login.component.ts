import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageServiceService } from '../storage-service.service';
import { id } from '@cds/core/internal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,private http: HttpClient, private storage : StorageServiceService) { }
  nombre='';
  contrasena='';
  user = '';
  server = 'https://adminuas-001-site3.gtempurl.com';
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
        const idp =usuario.puesto;
        const idu = usuario.id_usuario; // Obtener el id_carrera de la respuesta
        let ut = '';
        // Guardar id_carrera en localStorage 
        this.storage.setDataItem('token', token);
        this.storage.setDataItem('idUsuario', idu);

        if(idu=='1'||idp == 'administrador'){
          this.storage.setDataItem('idCarrera', idCarrera);
          ut = '1';
        }else if(idp=='general'){
          ut = '2';
        }else if(idp =='zona'){
          this.storage.setDataItem('idDinamico', usuario.id_zona);
          ut = '3';
        }else if (idp == 'facultad'){
          this.storage.setDataItem('idDinamico', usuario.id_facultad);
          ut='4';
        }else{
          this.storage.setDataItem('idCarrera', idCarrera);
          this.storage.setDataItem('idDinamico',idCarrera);
          ut='5';
        }
        this.storage.setDataItem('userTipe',ut);
        if(token!=''){
          setTimeout(() => {
            window.location.href = 'https://uas-proy.com/';
            // window.location.reload();
          }, 300);
        }else{
          spanElement.textContent = 'no se encontraron coincidencias usuario-contraseña';
        }

      }, (error) => {
        console.error('Error:', error);
        spanElement.textContent = 'es necesario llenar todos los campos';
      });
      setTimeout(function() {
        spanElement.textContent = '';
      }, 6000);
    }
    async initializeUserData() {
      // Usa la función 'getDataItem' del servicio 'StorageServiceService'
      this.user = this.storage.getDataItem('idUsuario') || '';
    }
  
    ngOnInit(): void {
      this.initializeUserData();
      this.storage.setDataItem('server', this.server);
      if(this.user != '' && this.user != null){
        setTimeout(() => {
          this.router.navigate(['/Sursumversus']);
        }, 200);

      }
    }
}