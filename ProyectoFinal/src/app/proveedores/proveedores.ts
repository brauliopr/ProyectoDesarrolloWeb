import { HttpClient ,HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './proveedores.html',
  styleUrl: './proveedores.scss',
})
export class Proveedores {
  model = {
	nombre: '',
  marcas_surtidas: '',
  tiempo_entrega: '',
  ubicacion: '',
  contacto: '',
	banco: '',
  cuenta_bancaria: '',
  clabe_interbancaria: ''
  }

  private apiURL = "http://localhost:3000/saveProveedores"

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

//Negro, blanco, azul, amarillo, gris 