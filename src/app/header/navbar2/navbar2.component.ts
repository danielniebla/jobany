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
  server = '';
  facu = '';
  ngOnInit(): void {
    this.storage.logout$.subscribe((value) => {
      this.server = this.storage.getDataItem('server') ?? '';
      this.facu = this.storage.getDataItem('idFacultad');
    });
    const authEndpoint = `${this.server}/api/Facultades/Consultar_Facultad?id_facultad=${this.facu}`;

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
    this.storage.clearAllDataItems();
    localStorage.clear();
    setTimeout(() => {
      window.location.href = 'https://yobani.onrender.com/';
      // this.router.navigate(['/login']);
    }, 300);
  }
}
