import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DietasService } from 'src/app/services/dietas/dietas.service';
import { Dieta } from '../../../models/dieta'

@Component({
  selector: 'app-creardieta',
  templateUrl: './creardieta.component.html',
  styleUrls: ['./creardieta.component.css']
})
export class CreardietaComponent implements OnInit {

  dieta$: Subscription;
  dietaForm: FormGroup;
  titulo = 'Crear dieta';
  id: string | null;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private dietasService: DietasService) { 
    this.dietaForm = this.fb.group({
      id_dietas: ['', Validators.required],
      id_objetivo: ['', Validators.required],
      id_dieta: ['', Validators.required],
      nivel: ['', Validators.required],
      dia: ['', Validators.required],
      musculo: ['', Validators.required],
      ejercicios: ['', Validators.required],
    })
    
  }

  ngOnInit(): void {
  }

  agregarDieta() {
    const DIETA: Dieta = {
      _id: this.id,
      id_dieta: this.dietaForm.get('id_dieta')?.value,
      id_objetivo: this.dietaForm.get('id_objetivo')?.value,
      nivel: this.dietaForm.get('nivel')?.value,
      tiempo: this.dietaForm.get('tiempo')?.value,
      alimentos: this.dietaForm.get('alimentos')?.value,
      carbohidratos: this.dietaForm.get('carbohidratos')?.value,
      proteinas: this.dietaForm.get('proteinas')?.value,
      peso: this.dietaForm.get('peso')?.value,

    }

    console.log('objeto',DIETA);
    this.dieta$ = this.dietasService.createDieta(DIETA).subscribe(data =>{
      this.toastr.success('La dieta fue creada con exíto', 'Dieta Creada');
      this.router.navigate(['/dietas']);
    })
  }

}



