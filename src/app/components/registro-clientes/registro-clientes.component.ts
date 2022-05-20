import { Component, OnInit } from '@angular/core';
import { RegistroClientesService } from 'src/app/services/registro_clientes/registro-clientes.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms'; 
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { RutinaService } from 'src/app/services/rutina/rutina.service';
import { rutina } from 'src/app/models/rutinamd';

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

  constructor(private registroClientesService: RegistroClientesService,private rutinaService: RutinaService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  rutina(id:any){
    this.cliente$ = this.rutinaService.getRutina(id).subscribe(entry =>{
      console.log('rutinas', entry);
    });
  }
  putDatos() {
    this.cliente$ = this.registroClientesService.putDatos(this.datosClienteForm.value).subscribe(entry => {
      console.log("Resultado", entry);
    });
  }
}
