import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { sucursal } from 'src/app/models/sucursal';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from 'src/app/services/sucursal/sucursal.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {

  cantidadClientes: number = 0;
  cantidadEmpleados: number = 0;

  sucursal$: Subscription;
  listSucursal: sucursal[] = [];
  sucursalForm: FormGroup;
  id: string | null ;
  
  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private sucursalService: SucursalService) { 
    this.sucursalForm = this.fb.group({
      noSucursal: ['', Validators.required],
      direccion: ['', Validators.required],
      cantidadClientes: [''],
      cantidadEmpleados: [''],
    })
    
  }

  ngOnInit(): void {
    
  }

  verificarSucursal(){
    let sucur = this.sucursalForm.value.noSucursal;
    if (String(sucur).length != 0){
      this.sucursal$ = this.sucursalService.getSucursales().subscribe(data =>{
        this.listSucursal = data.data;
        if(sucur == 0 ){
          this.sucursalForm.get('noSucursal')?.reset();
          this.toastr.warning('El número de sucursal no puede ser 0','Aviso!!');
        }
        for(let i=0; i < this.listSucursal.length; i++){
          if(this.listSucursal[i].noSucursal == sucur ){
            this.sucursalForm.get('noSucursal')?.reset();
            this.toastr.warning('El número de sucursal ya existe','Aviso!!');
          }
        }
      });
    }
    
  }

  agregarSucursal() {
    const SUCURSAL: sucursal = {
      _id: this.id,
      noSucursal: this.sucursalForm.get('noSucursal')?.value,
      direccion: this.sucursalForm.get('direccion')?.value,
      cantidadClientes: this.cantidadClientes,
      cantidadEmpleados: this.cantidadEmpleados,
    }
    console.log('objeto',SUCURSAL);
    this.sucursal$ = this.sucursalService.createSucursal(SUCURSAL).subscribe(data =>{
      this.toastr.success('La Sucursal fue creada con exíto', 'Sucursal Creada');
      this.router.navigate(['/listar-sucursal']);
    })
  }
  
  



}
  
