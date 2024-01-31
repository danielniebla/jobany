import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { FichasTecnicasComponent } from './fichas-tecnicas/fichas-tecnicas.component';
import { AdmincrudsComponent } from './admincruds/admincruds.component';
import { PhoneComponent } from './phone/phone.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Ruta predeterminada
  { path: 'login', component:LoginComponent },
  { path: 'Sursumversus', component:MainComponent },
  { path: 'Sursumversus/Admin', component:AdmincrudsComponent },
  { path: 'Sursumversus/FichaTecnica', component:FichasTecnicasComponent },
  { path: 'telefono_ver_mejor', component:PhoneComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
