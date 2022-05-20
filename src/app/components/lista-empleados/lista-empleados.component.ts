import { Component, OnInit } from '@angular/core';
import { TablaempleadoService } from 'src/app/services/tablaempleado/tablaempleado.service';
import { Subscription } from 'rxjs';
import { empleado } from 'src/app/models/empleado';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {

  identificador: number;
  empleado$: Subscription;
  listaempleado: empleado[] = [];
  page_size: number = 5;
  page_number: number = 1;
  pageSizeOptions = [5,10,25,50,100];

  handlePage(e: PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }
  constructor(private tablaempleadoService: TablaempleadoService, private toastr: ToastrService, public router: Router) { }

  ngOnInit(): void {
    try {
      this.identificador = history.state.blocker;
    } catch (error) { this.identificador = 0; }
    
    if (this.identificador != 1 && this.identificador != 2) {
      this.router.navigate(['/login']);
    }
    this.getRegistro();
  }
 
  getRegistro(){
    console.log('method');
    this.empleado$ = this.tablaempleadoService.getRegistro().subscribe(data =>{
      console.log('empleados del front',data);
      this.listaempleado = data.data;
      console.log('empleados',this.listaempleado);
    });
  }

  volver() {
    if (this.identificador == 1) {
      this.router.navigate(['/master'], {state: {blocker: this.identificador}});
    } else if (this.identificador == 2) {
      this.router.navigate(['/administrador'], {state: {blocker: this.identificador}});
    }
  }

  crear() {
    this.router.navigate(['/RegistroEmpleado'], {state: {blocker: this.identificador}});
  }

  DialogEliminarEmpleados(empleado: any){
    console.log('id a eliminar',empleado);
    Swal.fire({
      title:'Se eliminará el empleado',
      text: 'Esta acción no puede revertirse',
      icon: 'warning',
      iconColor: 'red',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result =>{
      if(result.value){
        this.empleado$ = this.tablaempleadoService.deleteRegistro(empleado).subscribe(data => {
          this.toastr.error('El empleado fue eliminado con exíto', 'Empleado Eliminado!');
          this.getRegistro();
        })
      }
    })
  }

  DialogEditarempleado(empleado: any){
    console.log('Empleado a editar',empleado);
    Swal.fire({
      html: `
        <h1 style="text-align: center; display: block; color: #3085d6;">Editar Empleado</h1><br>
        <form>
          <strong style="text-align: left; display: block;"> Nombre Completo </strong><br>
          <input type="text" id="nombreCompleto" value="${empleado.nombreCompleto}" class="form-control"><br>
          <strong style="text-align: left; display: block;"> DPI </strong><br>
          <input type="text"  id="dpi"  value="${empleado.dpi}"   class="form-control" maxlength="13" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"><br>
          <strong style="text-align: left; display: block;"> Fecha de Nacimiento </strong><br>
          <input type="text" id="fechaNacimiento"  value="${empleado.fechaNacimiento}"  class="form-control"><br>
          <strong style="text-align: left; display: block;"> Email </strong><br>
          <input type="text" id="email" value="${empleado.email}"  class="form-control"><br>
          <strong style="text-align: left; display: block;"> Telefono </strong><br>
          <input type="text" id="telefono" value="${empleado.telefono}"  class="form-control" maxlength="8" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"><br>
          <strong style="text-align: left; display: block;"> No. Sucursal </strong><br>
          <input type="number" id="noSucursal" value="${empleado.noSucursal}"  class="form-control"  ><br>
          <strong style="text-align: left; display: block;"> Puesto </strong><br>
          <input type="text" id="puesto_rol" value="${empleado.puesto_rol}"  class="form-control"  ><br>
        </form>
      `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#858585',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(result =>{
      if(result.value){
        const nombreCompleto = (<HTMLInputElement>document.getElementById("nombreCompleto")).value;
        const dpi = (<HTMLInputElement>document.getElementById("dpi")).value;
        const fechaNacimiento = (<HTMLInputElement>document.getElementById("fechaNacimiento")).value;
        const email = (<HTMLInputElement>document.getElementById("email")).value;
        const telefono = (<HTMLInputElement>document.getElementById("telefono")).value;
        const noSucursal = (<HTMLInputElement>document.getElementById("noSucursal")).value;
        const puesto_rol = (<HTMLInputElement>document.getElementById("puesto_rol")).value;
        const id = empleado._id;
        const DPI = Number(dpi);
        const Nosucursal = Number(noSucursal);
        const EmpleadoUpdate = {id,nombreCompleto, DPI, fechaNacimiento, email, telefono, Nosucursal, puesto_rol};
        console.log("objeto para Update",EmpleadoUpdate);
        this.empleado$ = this.tablaempleadoService.updateRegistro(EmpleadoUpdate).subscribe(data => {
          this.toastr.info('El empleado fue editado con exíto', 'Empleado Editado!');
          this.getRegistro();
        })
      }
    })

  }

  ngOnDestroy(){
    this.empleado$.unsubscribe;
  }



}
