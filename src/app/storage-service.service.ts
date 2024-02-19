import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {
  private logoutSubject = new BehaviorSubject<boolean>(false);
  logout$ = this.logoutSubject.asObservable();

  constructor(private ngZone: NgZone) {
    window.addEventListener('storage', (event) => {
      // Verifica si el cambio proviene de esta aplicación y de la clave que te interesa
      if (event.storageArea === localStorage && event.key === 'logoutEvent') {
        this.ngZone.run(() => {
          // Notifica el cambio solo si el valor es 'true'
          if (event.newValue === 'true') {
            this.logoutSubject.next(true);
          }
        });
      }
    });
  }

  setDataItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
    // Emite en el observable solo si el valor cambia a 'true'
    localStorage.setItem('logoutEvent', 'true');
  }

  getDataItem(key: string): any | undefined {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeDataItem(key: string) {
    localStorage.removeItem(key);
    // Emite en el observable solo si el valor cambia a 'true'
    localStorage.setItem('logoutEvent', 'true');
  }

  clearAllDataItems() {
    localStorage.clear();
    // Emite en el observable solo si el valor cambia a 'true'
    localStorage.setItem('logoutEvent', 'true');
  }
}