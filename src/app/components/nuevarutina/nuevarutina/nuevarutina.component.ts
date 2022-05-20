import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { rutina } from 'src/app/models/rutinamd';
import { ToastrService } from 'ngx-toastr';
import { RutinaService } from 'src/app/services/rutina/rutina.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nuevarutina',
  templateUrl: './nuevarutina.component.html',
  styleUrls: ['./nuevarutina.component.css']
})
export class NuevarutinaComponent implements OnInit {

  rutina$: Subscription;
  rutinaForm: FormGroup;
  titulo = 'Crear rutina';
  id: string | null;
  identificador: number;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private rutinaService: RutinaService) { 
    this.rutinaForm = this.fb.group({
      id_rutina: ['', Validators.required],
      id_objetivo: ['', Validators.required],
      id_dieta: ['', Validators.required],
      nivel: ['', Validators.required],
      dia: ['', Validators.required],
      musculo: ['', Validators.required],
      ejercicios: ['', Validators.required],
    })
    
  }

  ngOnInit(): void {
    try {
      this.identificador = history.state.blocker;
    } catch (error) { this.identificador = 0; }
    
    if (this.identificador != 1 && this.identificador != 2 && this.identificador != 3) {
      this.router.navigate(['/login']);
    }
  }

  volver() {
    this.router.navigate(['/rutinas'], {state: {blocker: this.identificador}});
  }

  agregarRutina() {
    const RUTINA: rutina = {
      _id: this.id,
      id_rutina: this.rutinaForm.get('id_rutina')?.value,
      id_objetivo: this.rutinaForm.get('id_objetivo')?.value,
      id_dieta: this.rutinaForm.get('id_dieta')?.value,
      nivel: this.rutinaForm.get('nivel')?.value,
      dia: this.rutinaForm.get('dia')?.value,
      musculo: this.rutinaForm.get('musculo')?.value,
      ejercicios: this.rutinaForm.get('ejercicios')?.value,
    }
    console.log('objeto',RUTINA);
    this.rutina$ = this.rutinaService.createRutina(RUTINA).subscribe(data =>{
      this.toastr.success('La rutina fue creada con exíto', 'Rutina Creada');
      this.volver();
    })
  }

}
