import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginEmpleadosComponent } from './components/login_empleados/login-empleados/login-empleados.component';
import { RegistroEmpleadosComponent } from './components/registro_empleados/registro-empleados/registro-empleados.component';
import { AppComponent } from './app.component';

import { ListarSucursalComponent } from './components/listar-sucursal/listar-sucursal.component';
import { SucursalComponent } from './components/sucursal/sucursal.component';
import { RutinaComponent } from './components/rutina/rutina/rutina.component';
import { LoginComponent } from './components/roles/login/login.component';
import { MasterComponent } from './components/roles/master/master.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'RegistroEmpleado', component: RegistroEmpleadosComponent },
  { path: 'master', component: MasterComponent },
  { path: 'listar-sucursal', component: ListarSucursalComponent },
  { path: 'crear-sucursal', component: SucursalComponent },
  { path: 'editar-sucursal', component: SucursalComponent },
  { path: 'rutinas', component: RutinaComponent },
  //{ path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
