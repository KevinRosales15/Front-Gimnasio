import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { empleado } from 'src/app/models/empleado';
import { ToastrService } from 'ngx-toastr';
import { TablaempleadoService } from 'src/app/services/tablaempleado/tablaempleado.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registro-empleados',
  templateUrl: './registro-empleados.component.html',
  styleUrls: ['./registro-empleados.component.css']
})
export class RegistroEmpleadosComponent implements OnInit {

  empleado$: Subscription;
  empleadoForm: FormGroup;
  titulo = 'Registrar Empleado';
  id: string | null ;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private empleadoService: TablaempleadoService) { 
   
      this.empleadoForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      dpi: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      noSucursal: ['', Validators.required],
      password: ['', Validators.required],
      puesto_rol: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }
  agregarempleado() {
    const REGISTRO_EMPLEADOS: empleado = {
      _id: this.id,
      nombreCompleto: this.empleadoForm.get('nombreCompleto')?.value,
      dpi: this.empleadoForm.get('dpi')?.value,
      fechaNacimiento: this.empleadoForm.get('fechaNacimiento')?.value,
      email: this.empleadoForm.get('email')?.value,
      telefono: this.empleadoForm.get('telefono')?.value,
      noSucursal: this.empleadoForm.get('noSucursal')?.value,
      password: this.empleadoForm.get('password')?.value,
      puesto_rol: this.empleadoForm.get('puesto_rol')?.value,
    }
    console.log('EMPLEADO',REGISTRO_EMPLEADOS);
    this.empleado$ = this.empleadoService.createRegistro(REGISTRO_EMPLEADOS).subscribe(data =>{
      this.toastr.success('Usuario creado con exíto');
      this.router.navigate(['/login']);
    })
    }
    
  }
