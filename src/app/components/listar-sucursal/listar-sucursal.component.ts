import { Component, OnInit, ViewChild } from '@angular/core';
import { SucursalService } from 'src/app/services/sucursal/sucursal.service';
import { Subscription } from 'rxjs';
import { sucursal } from 'src/app/models/sucursal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MatPaginator, PageEvent } from '@angular/material/paginator';





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

  handlePage(e: PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  
  constructor(private sucursalService: SucursalService, private toastr: ToastrService, ) { }


  ngOnInit(): void {
    this.getSucursales();
    
  }



  getSucursales(){
    console.log('method');
    this.sucursal$ = this.sucursalService.getSucursales().subscribe(data =>{
      console.log('sucursal del front',data);
      this.listSucursal = data.data;
      console.log('sucursal',this.listSucursal);
    });
  }


  DialogEliminarSucursal(id: any){
    console.log('id a eliminar',id);
    Swal.fire({
      title:'Se eliminará la sucursal',
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

}

  
  

