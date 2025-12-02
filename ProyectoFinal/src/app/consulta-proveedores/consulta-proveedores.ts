import { CommonModule } from '@angular/common';
import { HttpClient ,HttpClientModule } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-consulta-proveedores',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './consulta-proveedores.html',
  styleUrl: './consulta-proveedores.scss',
})
export class ConsultaProveedores implements OnInit{

  proveedores = signal<Proveedores[]>([]);
  cargando = signal<boolean>(true);

  private apiURL = 'http://localhost:3000/getAllProveedores';//Ruta de tu endpoint

  constructor(private http: HttpClient){}
  ngOnInit(): void {
    //Este metodo se ejecuta hasta que se muestra en pantalla tu componente
    this.loadProveedores();
  }

  private loadProveedores(){
    this.cargando.set(true);

    //Realizamos la llamada a la api quedando a la espera de un response
    this.http.get<Proveedores[]>(this.apiURL).subscribe({
      next: (data)=>{
        console.log(data)
        this.proveedores.set(data || []);
        this.cargando.set(false);
      },
      error:(err)=>{
        console.log("Error al obtener los datos."+err);
        this.proveedores.set([]);
        this.cargando.set(false);
      } 
    });
  }
}
