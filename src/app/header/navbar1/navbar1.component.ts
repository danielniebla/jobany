import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-navbar1',
  templateUrl: './navbar1.component.html',
  styleUrls: ['./navbar1.component.css']
})
export class Navbar1Component implements OnInit {
  constructor(private http: HttpClient) {}
  carrera='';
  server = '';
  ngOnInit(): void {
    this.server = localStorage.getItem('server') ?? '';
    const facu = localStorage.getItem('idCarrera');
    const authEndpoint = `${this.server}/api/Carreras/Consultar_Carrera?id_carrera=${facu}`;

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
        this.carrera = response[0].nombre;
      }, (error) => {
        console.error('Error:', error);
      });
  }



}
