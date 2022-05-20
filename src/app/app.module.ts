import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RutinaComponent } from './components/rutina/rutina/rutina.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RegistroEmpleadosComponent } from './components/registro_empleados/registro-empleados/registro-empleados.component';
import { AuthService } from './services/auth.service';
import { AdminComponent } from './components/roles/admin/admin.component';
import { InstructorComponent } from './components/roles/instructor/instructor.component';
import { MasterComponent } from './components/roles/master/master.component';
import { LoginComponent } from './components/login/login.component';
import { PagoPlataformaComponent } from './components/pago-plataforma/pago-plataforma.component';
import { RegistroClientesComponent } from './components/registro-clientes/registro-clientes.component';
import { ListarClientesComponent } from './components/listar-clientes/listar-clientes.component';
import { SucursalComponent } from './components/sucursal/sucursal.component';
import { ListarSucursalComponent } from './components/listar-sucursal/listar-sucursal.component';
import { ToastrModule } from 'ngx-toastr';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PaginacionPipe } from './pipes/paginacion.pipe';
import { ListaEmpleadosComponent } from './components/lista-empleados/lista-empleados.component';
import { PaginacionRutinasPipe } from './pipes/paginacion-rutinas.pipe';
import { NuevarutinaComponent } from './components/nuevarutina/nuevarutina/nuevarutina.component';
import { DietaComponent } from './components/dieta/dieta.component';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    RutinaComponent,
    RegistroEmpleadosComponent,
    AdminComponent,
    InstructorComponent,
    MasterComponent,
    LoginComponent,
    PagoPlataformaComponent,
    SucursalComponent,
    ListarSucursalComponent,
    PaginacionPipe,
    ListaEmpleadosComponent,
    PaginacionRutinasPipe,
    NuevarutinaComponent,
    DietaComponent,
    RegistroClientesComponent,
    ListarClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    ToastrModule.forRoot(),
    SocketIoModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSelectModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
