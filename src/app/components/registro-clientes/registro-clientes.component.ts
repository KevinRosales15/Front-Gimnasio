import { Component, OnInit } from '@angular/core';
import { RegistroClientesService } from 'src/app/services/registro_clientes/registro-clientes.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms'; 
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { RutinaService } from 'src/app/services/rutina/rutina.service';
import { rutina } from 'src/app/models/rutinamd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-clientes',
  templateUrl: './registro-clientes.component.html',
  styleUrls: ['./registro-clientes.component.css']
})
export class RegistroClientesComponent implements OnInit {

  datosClienteForm = new FormGroup({
    nombreCompleto: new FormControl(''),
    dpi: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    email: new FormControl(''),
    telefono: new FormControl(''),
    noSucursal: new FormControl(''),
    objetivo: new FormControl('')
  });

  cliente$: Subscription;
  identificador: number;

  constructor(private registroClientesService: RegistroClientesService, private rutinaService: RutinaService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    try {
      this.identificador = history.state.blocker;
    } catch (error) { this.identificador = 0; }
    
    if (this.identificador != 1 && this.identificador != 2 && this.identificador != 3) {
      this.router.navigate(['/login']);
    }
  }

  volver() {
    this.router.navigate(['/ListarClientes'], {state: {blocker: this.identificador}});
  }

  rutina(id:any){
    this.cliente$ = this.rutinaService.getRutina(id).subscribe(entry =>{
      console.log('rutinas', entry);
    });
  }

  putDatos() {
    this.cliente$ = this.registroClientesService.putDatos(this.datosClienteForm.value).subscribe(entry => {
      console.log("Resultado", entry);
      this.volver();
    });
  }
}
