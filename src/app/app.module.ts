import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from "@clr/angular";
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { ClickAwayDirective } from './click-away.directive';
import { HttpClientModule } from '@angular/common/http';
import { FichasTecnicasComponent } from './fichas-tecnicas/fichas-tecnicas.component';
import { HeaderModule } from './header/header.module';
import { FooterComponent } from './footer/footer.component';
import { UnidadAcademicaComponent } from './unidad-academica/unidad-academica.component';
import { IndicadorComponent } from './indicador/indicador.component';
import { PlaneacionComponent } from './planeacion/planeacion.component';
import { RecomendacionComponent } from './recomendacion/recomendacion.component';
import { DatePipe } from '@angular/common';
import { AdmincrudsComponent } from './admincruds/admincruds.component';
import { CrudUsersComponent } from './crud-users/crud-users.component';
import { CrudzonasComponent } from './crudzonas/crudzonas.component';
import { CrudfacultadesComponent } from './crudfacultades/crudfacultades.component';
import { CrudfacarrerasComponent } from './crudfacarreras/crudfacarreras.component';
import { Ficha1Component } from './ficha-1/ficha-1.component';
import { Ficha2Component } from './ficha-2/ficha-2.component';
import { Ficha3Component } from './ficha-3/ficha-3.component';
import { Ficha4Component } from './ficha-4/ficha-4.component';
import { Ficha5Component } from './ficha-5/ficha-5.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { Ficha6Component } from './ficha-6/ficha-6.component';
import { Ficha7Component } from './ficha-7/ficha-7.component';
import { Ficha8Component } from './ficha-8/ficha-8.component';
import { Ficha9Component } from './ficha-9/ficha-9.component';
import { Ficha10Component } from './ficha-10/ficha-10.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    ClickAwayDirective,
    FichasTecnicasComponent,
    FooterComponent,
    UnidadAcademicaComponent,
    IndicadorComponent,
    PlaneacionComponent,
    RecomendacionComponent,
    AdmincrudsComponent,
    CrudUsersComponent,
    CrudzonasComponent,
    CrudfacultadesComponent,
    CrudfacarrerasComponent,
    Ficha1Component,
    Ficha2Component,
    Ficha3Component,
    Ficha4Component,
    Ficha5Component,
    Ficha6Component,
    Ficha7Component,
    Ficha8Component,
    Ficha9Component,
    Ficha10Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    FormsModule,
    HttpClientModule,
    HeaderModule,
    provideFirebaseApp(() => initializeApp({"projectId":"indicadores-b465a","appId":"1:680958424249:web:f501e47574f8f5ad75d768","storageBucket":"indicadores-b465a.appspot.com","apiKey":"AIzaSyDkK1SIq8yX4FPDgHH5ttAkc_qbx7oTTxM","authDomain":"indicadores-b465a.firebaseapp.com","messagingSenderId":"680958424249","measurementId":"G-42046H3C8S"})),
    provideStorage(() => getStorage())
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
