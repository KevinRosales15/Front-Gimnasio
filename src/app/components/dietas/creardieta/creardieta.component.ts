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
  getdietas$: Subscription;

  dietaForm: FormGroup;
  titulo = 'Crear dieta';
  id: string | null;
  identificador: number;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private dietasService: DietasService) {
    this.dietaForm = this.fb.group({
      id_objetivo: ['', Validators.required],
      nivel: ['', Validators.required],
      tiempo: ['', Validators.required],
      alimentos: ['', Validators.required],
      carbohidratos: ['', Validators.required],
      proteinas: ['', Validators.required],
      peso: ['', Validators.required],
    });

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
    this.router.navigate(['/dietas'], { state: { blocker: this.identificador } });
  }

  agregarDieta() {

    this.getdietas$ = this.dietasService.getDietas().subscribe(entry => {


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


      var e = 0;
      const array = [];
      const num = [];

      for (var i in entry.dieta) {
        array.push(entry.dieta[i]);
        const ar = array[e];
        e += 1

        if (ar.id_dieta === '' || ar.id_dieta === null || ar.id_dieta === undefined) {
        }
        else {
          num.push(ar.id_dieta);
        }

        const max = Math.max.apply(null, num);
        DIETA.id_dieta = max + 1;
      }

      console.log('objeto', DIETA);
      this.dieta$ = this.dietasService.createDieta(DIETA).subscribe(data => {
        this.toastr.success('La dieta fue creada con exíto', 'Dieta Creada');
        this.router.navigateByUrl('dietas');
        this.volver();
      });


    });
  }
}




