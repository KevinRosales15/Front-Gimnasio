import { Component, OnInit } from '@angular/core';
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

  sucursal$: Subscription;
  sucursalForm: FormGroup;
  titulo = 'Crear Sucursal';
  id: string | null ;
  
  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private sucursalService: SucursalService) { 
    this.sucursalForm = this.fb.group({
      noSucursal: ['', Validators.required],
      direccion: ['', Validators.required],
      cantidadClientes: ['', Validators.required],
      cantidadEmpleados: ['', Validators.required],
    })
    
  }

  ngOnInit(): void {
    
  }

  agregarSucursal() {
    const SUCURSAL: sucursal = {
      _id: this.id,
      noSucursal: this.sucursalForm.get('noSucursal')?.value,
      direccion: this.sucursalForm.get('direccion')?.value,
      cantidadClientes: this.sucursalForm.get('cantidadClientes')?.value,
      cantidadEmpleados: this.sucursalForm.get('cantidadEmpleados')?.value,
    }
    console.log('objeto',SUCURSAL);
    this.sucursal$ = this.sucursalService.createSucursal(SUCURSAL).subscribe(data =>{
      this.toastr.success('La Sucursal fue creada con exíto', 'Sucursal Creada');
      this.router.navigate(['/listar-sucursal']);
    })
  }
  
  



}
  
