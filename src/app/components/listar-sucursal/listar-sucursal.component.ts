import { Component, OnInit } from '@angular/core';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Subscription } from 'rxjs';
import { sucursal } from 'src/app/models/sucursal';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listar-sucursal',
  templateUrl: './listar-sucursal.component.html',
  styleUrls: ['./listar-sucursal.component.css']
})
export class ListarSucursalComponent implements OnInit {

  sucursal$: Subscription;
  listSucursal: sucursal[] = []

  constructor(private sucursalService: SucursalService, private toastr: ToastrService) { }

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

  eliminarSucursal(id: any){
    this.sucursal$ = this.sucursalService.deleteSucursal(id).subscribe(data => {
      this.toastr.error('La Sucursal fue eliminada con exíto', 'Sucursal Eliminada!');
      this.getSucursales();
    })
  }

  
  
  

}
