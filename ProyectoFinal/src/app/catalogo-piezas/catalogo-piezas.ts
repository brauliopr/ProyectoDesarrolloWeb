import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-catalogo-piezas',
  standalone: true, 
  imports: [CommonModule, HttpClientModule],
  templateUrl: './catalogo-piezas.html',
  styleUrl: './catalogo-piezas.scss',
})
export class CatalogoPiezas implements OnInit{

  piezas = signal<Piezas[]>([]);
  cargando = signal<boolean>(true);

  private apiURL = 'http://localhost:3000/getAllPiezas';//Ruta de tu endpoint

  constructor(private http: HttpClient){}
  ngOnInit(): void {
    //Este metodo se ejecuta hasta que se muestra en pantalla tu componente
    this.loadPiezas();
  }

  private loadPiezas(){
    this.cargando.set(true);

    //Realizamos la llamada a la api quedando a la espera de un response
    this.http.get<Piezas[]>(this.apiURL).subscribe({
      next: (data)=>{
        console.log(data)
        this.piezas.set(data || []);
        this.cargando.set(false);
      },
      error:(err)=>{
        console.log("Error al obtener los datos."+err);
        this.piezas.set([]);
        this.cargando.set(false);
      }
    });
  }
}