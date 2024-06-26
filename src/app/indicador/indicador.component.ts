import { Component, OnInit, Renderer2  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-indicador',
  templateUrl: './indicador.component.html',
  styleUrls: ['./indicador.component.css']
})
export class IndicadorComponent implements OnInit {
  constructor(private http: HttpClient,private renderer: Renderer2, private storage : StorageServiceService) { }
  indicadores: any[] = [];
  flagIndicador: { [key: number]: boolean } = {};
  indi='';
  carrera?:number;
  tCarrera='';
  server= '';
  alert = false;
  contador=0;
  option: boolean | null | undefined;
  flag : boolean = false;
  title= 'Seleccionar una unidad academica';
  page=1;
  pages=1;
  paged=7;
  userType='';
  text='Agregar indicador';
  idCarreraString='';
  paginador(i:number){
    this.page=this.page+i;
    this.page = Math.round(this.page);
    if(this.page<1){
      this.page=1;
    }
    if(this.page>this.pages){
      this.page=this.pages;
    }
  }
  paginas(){
    this.pages=Math.ceil(this.indicadores.length/this.paged); 
  }
  agregar() {
    var elemento = document.getElementById("indicador");
    if (elemento) {
      if (elemento.style.display === "none") {
        this.flag = true;
        this.text='';
        elemento.style.display = "block";
      } else {
        this.flag = false;
        this.text='Agregar indicador';
        elemento.style.display = "none";
      }
    } else {
      console.error("El elemento no fue encontrado en el DOM.");
    }
  }

  indicadorToggle(indicador: any) {
    this.flagIndicador[indicador.id_pregunta]= !this.flagIndicador[indicador.id_pregunta];

    setTimeout(() => {
      const textAreas = document.querySelector(`.txtArea[data-index="${indicador.id_pregunta}"]`) as HTMLTextAreaElement;

      if (textAreas) {    
        // Agrega la propiedad readonly
        textAreas.readOnly = true;
      }
      if(this.userType=='2'){
  
          textAreas.classList.add('edit');
;
      }
    }, 10);
    
  }
  editarIndicador(indicador: any) {
    const imagenDisk = document.querySelector(`.disk[data-index="${indicador.id_pregunta}"]`) as HTMLImageElement;

    // Verifica si se encontró la imagen 'disk'
    if (imagenDisk) {
      // Agrega la clase deseada
      this.renderer.addClass(imagenDisk, 'editing');
    }
    const textAreas = document.querySelectorAll(`.txtArea[data-index="${indicador.id_pregunta}"]`) as NodeListOf<HTMLTextAreaElement>;

    textAreas.forEach(textArea => {
      // Añade la clase deseada
      textArea.classList.add('edit');

      // Elimina la propiedad readonly
      textArea.readOnly = false;
    });


  }
  actualizarDatosIndicador(){
    if(this.carrera!=null){
      const authEndpoint = `${this.server}/api/Respuestas/Consultar_Pregunta`;

      // Datos para enviar
      const authData = {
        "id_pregunta": 0,
        "id_carrera": this.carrera,
        "eje": 0,
        "categoria": 0,
        "indicador": 0,
        "nombre": "string",
        "valuacion": "string"
      }

      
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
          this.indicadores = response;
          this.pages=Math.ceil(this.indicadores.length/this.paged);
        }, (error) => {
          console.error('Error:', error);
        });
    }
      
  }
  async initializeUserData() {
    // Usa la función 'getDataItem' del servicio 'StorageServiceService'
    this.userType = this.storage.getDataItem('userTipe') || '';
    this.server = this.storage.getDataItem('server') || '';
    this.idCarreraString = this.storage.getDataItem('idCarrera') || '';
  }
  ngOnInit(): void {
    this.initializeUserData();
    this.Carrera();
    setTimeout(() => {
      this.actualizarDatosIndicador();
    }, 500);

  }
  actualizarindicador(indicador: any){
    const authEndpoint = `${this.server}/api/Respuestas/Actualizar_Pregunta`;

    // Datos para enviar
    const authData = {
      "id_pregunta": indicador.id_pregunta,
      "id_carrera": indicador.id_carrera,
      "eje": indicador.eje,
      "categoria": indicador.categoria,
      "indicador": indicador.indicador,
      "nombre": indicador.nombre,
      "valuacion": indicador.valuacion,
      "margen": indicador.margen
    }

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
        this.indicadores = response;
        this.actualizarDatosIndicador()
      }, (error) => {
        console.error('Error:', error);
      });
      
  }
  Carrera(){
    if (this.idCarreraString !== null) {
      const idCarrera: number = parseInt(this.idCarreraString, 10);

      if (!isNaN(idCarrera)) {
        this.carrera = idCarrera;
        const authEndpointc = `${this.server}/api/Carreras/Consultar_Carrera_Id?id_carrera=${this.carrera}`;
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
            this.title = response[0].nombre;
            this.tCarrera = 'Carrera:';
          }, (error) => {
            console.error('Error:', error);
          });
      } else {
        console.error('El valor en localStorage de carrera no es un número válido.');
      }
    } else {
      console.error('No se encontró el id de la carrera en el almacenamiento local.');
    }
  }
  agregarindicador(){
    const authEndpoint = `${this.server}/api/Respuestas/Agregar_Pregunta`;

    // Datos para enviar
    const authData = {
      "id_pregunta": 0,
      "id_carrera": this.carrera,
      "eje": 0,
      "categoria": 0,
      "indicador": 0,
      "nombre": this.indi,
      "valuacion": "valuacion",
      "margen": 6
    }

    // Encabezados para la solicitud POST
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    if( this.carrera==0){
      if(this.userType=='1'){
          // Realizar la solicitud POST para obtener el token
        this.http.post(authEndpoint, authData, httpOptions)
        .subscribe((response: any) => {
          // Aquí puedes manejar la respuesta del servidor
          this.indicadores = response;
          this.actualizarDatosIndicador()
        }, (error) => {
          console.error('Error:', error);
        });
      }
       
    }else{
       // Realizar la solicitud POST para obtener el token
       this.http.post(authEndpoint, authData, httpOptions)
       .subscribe((response: any) => {
         // Aquí puedes manejar la respuesta del servidor
         this.indicadores = response;
         this.actualizarDatosIndicador()
       }, (error) => {
         console.error('Error:', error);
       });
    }
    
    }
    borrarRecomendacion(idIndicador: number){
      if(this.alert){
        const recomendacionAEliminar = {
          "id_pregunta": idIndicador,
          "id_carrera": 0,
          "eje": 0,
          "categoria": 0,
          "indicador": 0,
          "nombre": "string",
          "valuacion": "string",
          "margen": 0
        };
        
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'accept': '*/*' // Agregar el encabezado de aceptación, según lo esperado
          }),
          body: recomendacionAEliminar // Agregar el cuerpo de la solicitud con los datos a eliminar
        };
        
        this.http.delete(`${this.server}/api/Respuestas/Eliminar_Pregunta`, httpOptions)
          .subscribe(
            (response: any) => {
              // Manejar la respuesta aquí si es necesario
              this.actualizarDatosIndicador();
            },
            (error) => {
              // Manejar errores aquí
              console.error('Error:', error);
            }
          );
        
      }
      if(this.alert){
        this.alert=false;
      } 
    }

    verificarBorradoindicador(idIndicador: number) {
      this.alert = true;
      this.contador = 10;
      const intervalo = setInterval(() => {
        if(this.contador==0){
          this.borrarRecomendacion(idIndicador);
          clearInterval(intervalo);
        }else{
          this.eleccion();
        }
      }, 1000);
  
    }
    aceptarBorrado() {
      this.option = true;
    }
    
    cancelarBorrado() {
    }
    async eleccion(){
      if (this.option != null && this.option === true) {
        this.contador = 0;
        this.option = null;
      } else if (this.option != null && this.option === false) {
        this.alert = false;
        this.contador = 0;
        this.option = null;
      }
    }
  }
