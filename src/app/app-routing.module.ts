import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginEmpleadosComponent } from './components/login_empleados/login-empleados/login-empleados.component';
import { RegistroEmpleadosComponent } from './components/registro_empleados/registro-empleados/registro-empleados.component';
import { AppComponent } from './app.component';

import { ListarSucursalComponent } from './components/listar-sucursal/listar-sucursal.component';
import { SucursalComponent } from './components/sucursal/sucursal.component';
import { RutinaComponent } from './components/rutina/rutina/rutina.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'register', component: RegistroEmpleadosComponent },
  { path: 'login', component: LoginEmpleadosComponent },
  { path: 'listar-sucursal', component: ListarSucursalComponent },
  { path: 'crear-sucursal', component: SucursalComponent },
  { path: 'editar-sucursal', component: SucursalComponent },
  { path: 'rutina', component: RutinaComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
