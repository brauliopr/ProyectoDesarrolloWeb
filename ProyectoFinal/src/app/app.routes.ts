import { Routes } from '@angular/router';
import { Inventario } from './inventario/inventario';
import { Inicio } from './inicio/inicio';
import { Trabajos } from './trabajos/trabajos';
import { CatalogoPiezas } from './catalogo-piezas/catalogo-piezas';
import { ConsultaTrabajos } from './consulta-trabajos/consulta-trabajos';
import { Proveedores } from './proveedores/proveedores';
import { ConsultaProveedores } from './consulta-proveedores/consulta-proveedores';

export const routes: Routes = [
    {path: '', component: Inicio},
    {path: 'Inventario', component: Inventario},
    {path: 'Trabajos', component: Trabajos},
    {path: 'CatalogoPiezas', component: CatalogoPiezas},
    {path: 'ConsultaTrabajos', component: ConsultaTrabajos},
    {path: 'Proveedores', component: Proveedores},
    {path: 'ConsultaProveedores', component: ConsultaProveedores},
    {path: '**', redirectTo: 'Inicio'}
];
