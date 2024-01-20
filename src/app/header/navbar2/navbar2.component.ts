import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component implements OnInit {
  constructor(private router: Router,private http: HttpClient) {}
  facultad='';
  server = '';
  ngOnInit(): void {
    this.server = localStorage.getItem('server') ?? '';
    const facu = localStorage.getItem('idFacultad');
    const authEndpoint = `${this.server}/api/Facultades/Consultar_Facultad?id_facultad=${facu}`;

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
        this.facultad = response[0].nombre;
      }, (error) => {
        console.error('Error:', error);
      });
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
