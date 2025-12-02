import { CommonModule } from '@angular/common';
import { HttpClient ,HttpClientModule } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consulta-trabajos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './consulta-trabajos.html',
  styleUrl: './consulta-trabajos.scss',
})
export class ConsultaTrabajos implements OnInit {
  trabajos = signal<Trabajos[]>([]);
  cargando = signal<boolean>(true);
  trabajoEditando = signal<Trabajos | null>(null);
  mostrarModal = signal<boolean>(false);
  modoModal = signal<'editar' | 'eliminar' | 'nuevo'>('editar');

  private apiURL = 'http://localhost:3000';//Ruta de tu endpoint

  constructor(private http: HttpClient){}
  ngOnInit(): void {
    //Este metodo se ejecuta hasta que se muestra en pantalla tu componente
    this.loadTrabajos();
  }

  private loadTrabajos(){
    this.cargando.set(true);

    //Realizamos la llamada a la api quedando a la espera de un response
    this.http.get<Trabajos[]>(`${this.apiURL}/getAllTrabajos`).subscribe({
      next: (data)=>{
        console.log(data)
        this.trabajos.set(data || []);
        this.cargando.set(false);
      },
      error:(err)=>{
        console.log("Error al obtener los datos."+err);
        this.trabajos.set([]);
        this.cargando.set(false);
      } 
    });
  }
  eliminarTrabajo(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este trabajo?')) {
      this.http.delete(`${this.apiURL}/deleteTrabajos/${id}`).subscribe({
        next: () => {
          alert('Trabajo eliminado correctamente');
          this.loadTrabajos(); // Recargar la lista
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Error al eliminar el trabajo');
        }
      });
    }
  }

  // Método para abrir modal de edición
  editarTrabajo(id: number) {
    this.http.get<Trabajos>(`${this.apiURL}/getTrabajos/${id}`).subscribe({
      next: (data) => {
        this.trabajoEditando.set(data);
        this.modoModal.set('editar');
        this.mostrarModal.set(true);
      },
      error: (err) => {
        console.error('Error al cargar trabajo:', err);
      }
    });
  }

  // Método para guardar cambios
  guardarCambios() {
    if (this.trabajoEditando()) {
      const trabajo = this.trabajoEditando()!;
      
      this.http.put(`${this.apiURL}/updateTrabajo/${trabajo.id}`, trabajo).subscribe({
        next: () => {
          alert('Trabajo actualizado correctamente');
          this.mostrarModal.set(false);
          this.trabajoEditando.set(null);
          this.loadTrabajos(); // Recargar la lista
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar el trabajo');
        }
      });
    }
  }

  // Método para cancelar edición
  cancelarEdicion() {
    this.mostrarModal.set(false);
    this.trabajoEditando.set(null);
  }
}
 