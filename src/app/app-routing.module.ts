import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroEmpleadosComponent } from './components/registro_empleados/registro-empleados/registro-empleados.component';
import { AppComponent } from './app.component';
import { ListarSucursalComponent } from './components/listar-sucursal/listar-sucursal.component';
import { SucursalComponent } from './components/sucursal/sucursal.component';
import { RutinaComponent } from './components/rutina/rutina/rutina.component';
import { LoginComponent } from './components/login/login.component';
import { MasterComponent } from './components/roles/master/master.component';
import { InstructorComponent } from './components/roles/instructor/instructor.component';
import { AdminComponent } from './components/roles/admin/admin.component';
import { PagoPlataformaComponent } from './components/pago-plataforma/pago-plataforma.component';
import { ListaEmpleadosComponent } from './components/lista-empleados/lista-empleados.component';
import { NuevarutinaComponent } from './components/nuevarutina/nuevarutina/nuevarutina.component';
import { RegistroClientesComponent } from './components/registro-clientes/registro-clientes.component';
import { ListarClientesComponent } from './components/listar-clientes/listar-clientes.component';
import { CreardietaComponent } from './components/dietas/creardieta/creardieta.component';
import { DietasComponent } from './components/dietas/dietas/dietas.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'master', component: MasterComponent },
  { path: 'administrador', component: AdminComponent },
  { path: 'instructor', component: InstructorComponent },
  { path: 'ListarClientes', component: ListarClientesComponent },
  { path: 'CrearClientes', component: RegistroClientesComponent },
  { path: 'lista-empleados', component:ListaEmpleadosComponent },
  { path: 'RegistroEmpleado', component: RegistroEmpleadosComponent },
  { path: 'listar-sucursal', component: ListarSucursalComponent },
  { path: 'crear-sucursal', component: SucursalComponent },
  { path: 'rutinas', component: RutinaComponent },
  { path: 'nuevarutina', component: NuevarutinaComponent },
  { path: 'pagoPlataforma', component: PagoPlataformaComponent },
  { path: 'crear_dieta', component: CreardietaComponent },
  { path: 'dietas', component: DietasComponent}
  //{ path: '**', redirectTo: 'login', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
