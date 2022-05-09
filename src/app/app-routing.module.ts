import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginEmpleadosComponent } from './components/login_empleados/login-empleados/login-empleados.component';
import { RegistroEmpleadosComponent } from './components/registro_empleados/registro-empleados/registro-empleados.component';

const routes: Routes = [
  { path: 'register', component: RegistroEmpleadosComponent },
  { path: 'login', component: LoginEmpleadosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
