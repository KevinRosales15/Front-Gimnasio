import { Component, OnInit, OnDestroy } from '@angular/core';
import { SucursalService } from 'src/app/services/sucursal/sucursal.service';
import { Subscription } from 'rxjs';
import { sucursal } from 'src/app/models/sucursal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';






@Component({
  selector: 'app-listar-sucursal',
  templateUrl: './listar-sucursal.component.html',
  styleUrls: ['./listar-sucursal.component.css']
})
export class ListarSucursalComponent implements OnInit {

  sucursal$: Subscription;  
  listSucursal: sucursal[] = [];
  page_size: number = 5;
  page_number: number = 1;
  pageSizeOptions = [5,10,25,50,100];
  identificador: number;

  handlePage(e: PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }
  
  constructor(private sucursalService: SucursalService,  private toastr: ToastrService, public router: Router) {
  }


  ngOnInit(): void {
    try {
      this.identificador = history.state.blocker;
    } catch (error) { this.identificador = 0; }
    
    if (this.identificador != 1) {
      this.router.navigate(['/login']);
    }
    this.getSucursales();
  }

  volver() {
    this.router.navigate(['/master'], {state: {blocker: this.identificador}});
  }

  crear() {
    this.router.navigate(['/crear-sucursal'], {state: {blocker: this.identificador}});
  }

  getSucursales(){
    this.sucursal$ = this.sucursalService.getSucursales().subscribe(data =>{
      this.listSucursal = data.data;
      console.log('sucursales',this.listSucursal);
    });
  }

  DialogEliminarSucursal(id: any){
    Swal.fire({
      title:'Se va a eliminar la sucursal',
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
        this.sucursal$ = this.sucursalService.deleteSucursal(id).subscribe(data => {
          this.toastr.error('La Sucursal fue eliminada con exíto', 'Sucursal Eliminada!');
          this.getSucursales();
        })
      }
    })
  }

  DialogEditarSucursal(sucursal: any){
    Swal.fire({
      html: `
        <h1 style="text-align: center; display: block; color: #3085d6;">Editar Sucursal</h1><br>
        <form>
          <strong style="text-align: left; display: block;"> Número Sucursal </strong><br>
          <input type="number" id="noSucursal" value="${sucursal.noSucursal}"  class="form-control" disabled ><br>
          <strong style="text-align: left; display: block;"> Dirección </strong><br>
          <input type="text"  id="dirreccion"  value="${sucursal.direccion}"   class="form-control"><br>
          <strong style="text-align: left; display: block;"> Cantidad Clientes </strong><br>
          <input type="number" id="cantidadClientes"  value="${sucursal.cantidadClientes}"  class="form-control " disabled ><br>
          <strong style="text-align: left; display: block;"> Cantidad Empleados </strong><br>
          <input type="number" id="cantidadEmpleados" value="${sucursal.cantidadEmpleados}"  class="form-control" disabled ><br>
        </form>
      `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#858585',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(result =>{
      if(result.value){
        const numSucursal = (<HTMLInputElement>document.getElementById("noSucursal")).value;
        const direccion = (<HTMLInputElement>document.getElementById("dirreccion")).value;
        const numClientes = (<HTMLInputElement>document.getElementById("cantidadClientes")).value;
        const numEmpleados = (<HTMLInputElement>document.getElementById("cantidadEmpleados")).value;
        const id = sucursal._id;
        const noSucursal = Number(numSucursal);
        const cantidadClientes = Number(numClientes);
        const cantidadEmpleados = Number(numEmpleados);
        const SucursalUpdate = {id,noSucursal, direccion, cantidadClientes, cantidadEmpleados};
        console.log("objeto para Update",SucursalUpdate);
        this.sucursal$ = this.sucursalService.updateSucursal(SucursalUpdate).subscribe(data => {
          this.toastr.info('La Sucursal fue editada con exíto', 'Sucursal Editada!');
          this.getSucursales();
        })
      }
    })

  }

  ngOnDestroy(){
    this.sucursal$.unsubscribe;
  }

}



