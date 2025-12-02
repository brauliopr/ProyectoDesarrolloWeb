import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './inventario.html',
  styleUrl: './inventario.scss',
})
export class Inventario {
  model = {
    numero_parte: '',
    descripcion: '',
    cantidad: 0,
  }

  private apiURL = "http://localhost:3000/savePiezas"

  constructor(private http: HttpClient){}

  onSubmit(form: NgForm){
    if (form.invalid){
      return;
    }
    this.http.post(this.apiURL, this.model). subscribe({
      next: (data) => {
        console.log("datos registrados correctamente");
        alert("registro iniciado");
        form.resetForm();
      },
      error:(err)=>{
        console.log("error al insertar");
        alert("Error al insertar");
      }
    });
  }
}
