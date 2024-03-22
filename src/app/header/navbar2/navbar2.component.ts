import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageServiceService } from 'src/app/storage-service.service';
@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component implements OnInit {
  constructor(private router: Router,private http: HttpClient, private storage : StorageServiceService) {}
  facultad='';
  tittle = '';
  server = '';
  dinamic = '';
  userTipe = '';
  r = '';
  async loadData() {
    this.server = this.storage.getDataItem('server') || '';
    this.dinamic = this.storage.getDataItem('idDinamico') || this.storage.getDataItem('idCarrera') || '';
    this.userTipe = this.storage.getDataItem('userTipe') || '';
    this.r =this.storage.getDataItem('reload')||'';

  }
  ngOnInit(): void {
    this.loadData(); // Llama a la función que carga los datos al inicializar el componente
    if(this.r=='1'){
      this.storage.setDataItem('reload','0');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 300);

    }else{
      this.storage.logout$.subscribe((value) => {
        // Actualiza los datos cuando se produce un evento de logout
        this.loadData();
      });
    switch (this.userTipe) {
      case '1':///////////superadmin/////////
        this.facultad= 'Administrador de sistema';
        this.tittle='Puesto:';
          break;
      case '2':////////////general//////////
        this.facultad= 'Encargado general';
        this.tittle='Puesto:';
          break;
      case '3':///////////////zonas///////////
      this.tittle='Zona:';
      const authEndpointz = `${this.server}/api/Zona/Consultar_Zona_Id?id_zona=${this.dinamic}`;

      // Encabezados para la solicitud POST
      const httpOptionsz = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      // Realizar la solicitud POST para obtener el token
      this.http.get(authEndpointz, httpOptionsz)
        .subscribe((response: any) => {
          // Aquí puedes manejar la respuesta del servidor
          this.facultad = response[0].nombre;
        }, (error) => {
          console.error('Error:', error);
        });

          break;
      case '4'://////////////facultades///////////
        this.tittle='Facultad:';
        const authEndpointf = `${this.server}/api/Facultades/Consultar_Facultad_Id?id_facultad=${this.dinamic}`;

        // Encabezados para la solicitud POST
        const httpOptionsf = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };

        // Realizar la solicitud POST para obtener el token
        this.http.get(authEndpointf, httpOptionsf)
          .subscribe((response: any) => {
            // Aquí puedes manejar la respuesta del servidor
            this.facultad = response[0].nombre;
          }, (error) => {
            console.error('Error:', error);
          });
          break;
      case '5'://///////carreras/////
      this.tittle='Carrera:';
        const authEndpointc = `${this.server}/api/Carreras/Consultar_Carrera_Id?id_carrera=${this.dinamic}`;
        // Encabezados para la solicitud POST
        const httpOptionsc = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };

        // Realizar la solicitud POST para obtener el token
        this.http.get(authEndpointc, httpOptionsc)
          .subscribe((response: any) => {
            // Aquí puedes manejar la respuesta del servidor
            this.facultad = response[0].nombre;
          }, (error) => {
            console.error('Error:', error);
          });

          break;
      default:
        this.tittle='';

    }
    }

  }
  logOut(){
    this.storage.clearAllDataItems();
    localStorage.clear();
    this.storage.setDataItem('reload','1');
    setTimeout(() => {
      // window.location.reload();
      window.location.href = 'https://localhost:80';

    }, 100);
  }
}
