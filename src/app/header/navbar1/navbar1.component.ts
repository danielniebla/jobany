import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageServiceService } from 'src/app/storage-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar1',
  templateUrl: './navbar1.component.html',
  styleUrls: ['./navbar1.component.css']
})
export class Navbar1Component implements OnInit {
  private logoutSubscription!: Subscription;

  constructor(private http: HttpClient, private storage: StorageServiceService) {}

  carrera = '';
  server = '';
  facu = '';

  ngOnInit(): void {
    // Suscribe al observable logout$
    this.logoutSubscription = this.storage.logout$.subscribe((value) => {
      this.server = this.storage.getDataItem('server') ?? '';
      this.facu = this.storage.getDataItem('idCarrera') ?? '';
      this.updateCarrera();
    });
    this.updateCarrera();
  }

  private updateCarrera(): void {
    const authEndpoint = `${this.server}/api/Carreras/Consultar_Carrera?id_carrera=${this.facu}`;

    // Encabezados para la solicitud GET
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Realizar la solicitud GET para obtener el nombre de la carrera
    this.http.get(authEndpoint, httpOptions)
      .subscribe((response: any) => {
        // Aquí puedes manejar la respuesta del servidor
        this.carrera = response[0].nombre;
      }, (error) => {
        console.error('Error:', error);
      });
  }
}
