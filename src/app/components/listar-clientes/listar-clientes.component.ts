import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegistroClientesService } from 'src/app/services/registro_clientes/registro-clientes.service';
import { Subscription } from 'rxjs';
import { cliente } from 'src/app/models/clientes';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';






@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  cliente$: Subscription;
  listCliente: cliente[] = [];
  page_size: number = 5;
  page_number: number = 1;
  pageSizeOptions = [5,10,25,50,100];
  identificador: number;

  handlePage(e: PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  
  constructor(private clientesService: RegistroClientesService, private toastr: ToastrService, public router: Router) {
   }


  ngOnInit(): void {
    try {
      this.identificador = history.state.blocker;
    } catch (error) { this.identificador = 0; }
    
    if (this.identificador != 1 && this.identificador != 2 && this.identificador != 3) {
      this.router.navigate(['/login']);
    }
    this.getClientes();
  }

  volver() {
    if (this.identificador == 1) {
      this.router.navigate(['/master'], {state: {blocker: this.identificador}});
    } else if (this.identificador == 2) {
      this.router.navigate(['/administrador'], {state: {blocker: this.identificador}});
    } else if (this.identificador == 3) {
      this.router.navigate(['/instructor'], {state: {blocker: this.identificador}});
    }
  }

  crear() {
    if (this.identificador == 1 || this.identificador == 2) {
      this.router.navigate(['/CrearClientes'], {state: {blocker: this.identificador}});
    }
  }

  getClientes(){
    this.cliente$ = this.clientesService.getClientes().subscribe(entry =>{
      this.listCliente = entry.clientes;
    });
  }


  DialogEliminarCliente(cliente: any){
    console.log('id a eliminar',cliente);
    Swal.fire({
      title:'Se va a eliminar el cliente',
      text: 'Esta acci??n no puede revertirse',
      icon: 'warning',
      iconColor: 'red',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result =>{
      if(result.value){
        this.cliente$ = this.clientesService.deleteClientes(cliente).subscribe(data => {
          this.toastr.error('El cliente fue eliminado con ex??to', 'Cliente Eliminado!');
          this.getClientes();
        })
      }
    })
  }

  DialogEditarCliente(cliente: any){
    console.log('Cliente a editar',cliente);
    Swal.fire({
      html: `
        <h1 style="text-align: center; display: block; color: #3085d6;">Editar Cliente</h1><br>
        <form>
          <strong style="text-align: left; display: block;"> Nombre completo </strong><br>
          <input type="text" id="nombreCompleto" value="${cliente.nombreCompleto}"  class="form-control" ><br>
          <strong style="text-align: left; display: block;"> dpi </strong><br>
          <input type="text"  id="dpi"  value="${cliente.dpi}"   class="form-control" maxlength="13" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"><br>
          <strong style="text-align: left; display: block;"> email </strong><br>
          <input type="text" id="email"  value="${cliente.email}"  class="form-control "><br>
          <strong style="text-align: left; display: block;"> telefono </strong><br>
          <input type="number" id="telefono" value="${cliente.telefono}"  class="form-control" maxlength="8" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"><br>
          <strong style="text-align: left; display: block;"> Fecha de nacimiento </strong><br>
          <input type="date" id="fechaNacimiento" value="${cliente.fechaNacimiento}"  class="form-control"  ><br>
          <strong style="text-align: left; display: block;"> objetivo </strong><br>
          <input type="number" id="objetivo" value="${cliente.objetivo}"  class="form-control"  ><br>
        </form>
      `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#858585',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(result =>{
      if(result.value){
        const nombCompleto = (<HTMLInputElement>document.getElementById("nombreCompleto")).value;
        const DPI = (<HTMLInputElement>document.getElementById("dpi")).value;
        const Email = (<HTMLInputElement>document.getElementById("email")).value;
        const Telefono = (<HTMLInputElement>document.getElementById("telefono")).value;
        const FechaNacimiento = (<HTMLInputElement>document.getElementById("fechaNacimiento")).value;
        const Objetivo = (<HTMLInputElement>document.getElementById("objetivo")).value;
        const id = cliente._id;
        const nombreCompleto = (nombCompleto);
        const dpi = Number(DPI);
        const email = (Email);
        const telefono = Number(Telefono);
        const fechaNacimiento = (FechaNacimiento);
        const objetivo = (Objetivo);
        const ClienteUpdate = {id,nombreCompleto, dpi, email, telefono,fechaNacimiento, objetivo };
        console.log("objeto para Update",ClienteUpdate);
        this.cliente$ = this.clientesService.updateClientes(ClienteUpdate).subscribe(data => {
          this.toastr.info('El cliente fue editado con ex??to', 'Cliente Editado!');
          this.getClientes();
        })
      }
    })

  }

  ngOnDestroy(){
    this.cliente$.unsubscribe;
  }

}



