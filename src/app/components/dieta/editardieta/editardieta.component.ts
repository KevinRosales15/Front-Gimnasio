import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Dieta } from 'src/app/models/dieta';
import { DietaService } from 'src/app/services/dieta/dieta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editardieta',
  templateUrl: './editardieta.component.html',
  styleUrls: ['./editardieta.component.css']
})
export class EditardietaComponent implements OnInit {

  updatedieta$ = Subscription;
  // countcollect$: Subscription;
  // getdieta$: Subscription;
  sucursal$: Subscription;
  createdieta$: Subscription;
  getdietas$: Subscription;

  dietaForm: FormGroup;
  options: FormGroup;

  titulo = 'Actualizar Dieta';
  max: number;
  hideRequiredControl: any;
  floatLabelControl: any;


  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private dietaService: DietaService) {
    this.dietaForm = this.fb.group({
      objetivo: ['', Validators.required],
      nivel: ['', Validators.required],
      tiempo: ['', Validators.required],
      alimentos: ['', Validators.required],
      carbohidratos: ['', Validators.required],
      proteinas: ['', Validators.required],
      peso: ['', Validators.required],
    });

    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }
  ngOnInit(): void {
  }


  updateDieta() {
    this.getdietas$ = this.dietaService.getDietas().subscribe(entry => {

      const dieta: Dieta = {
        id_dieta: this.max,
        id_objetivo: this.dietaForm.get('objetivo')?.value,
        nivel: this.dietaForm.get('nivel')?.value,
        tiempo: this.dietaForm.get('tiempo')?.value,
        alimentos: this.dietaForm.get('alimentos')?.value,
        carbohidrados: this.dietaForm.get('carbohidratos')?.value,
        proteinas: this.dietaForm.get('proteinas')?.value,
        peso: this.dietaForm.get('peso')?.value
      }

      //console.log('Dieta desde front \n', dieta);

      const array = [];
      var e = 0;
      const num = [];

      for (var i in entry.dieta) {
        array.push(entry.dieta[i]);
        const ar = array[e];
        e += 1

        console.log('ar',ar)

        num.push(ar.id_dieta);

        const max = Math.max.apply(null, num);
        console.log('max', max)

        dieta.id_dieta = max + 1;

        console.log('dddd', dieta)

        this.createdieta$ = this.dietaService.createDieta(dieta).subscribe(resul => {
          console.log(resul);
          // this.getdietas$ = this.dietaService.getDietas().subscribe(entry => {
          //   console.log(entry);
          // });
        });



        // if (ar !== '' || ar !== null) {

        //   num.push(ar.id_dieta);

        //   const max = Math.max.apply(null, num);
        //   console.log('max', max)

        //   dieta.id_dieta = max + 1;

        //   console.log('dddd', dieta)

        //   this.createdieta$ = this.dietaService.createDieta(dieta).subscribe(resul => {
        //     console.log(resul);
        //     this.getdietas$ = this.dietaService.getDietas().subscribe(entry => {
        //       console.log(entry);
        //     });
        //   });

        // }
        // else {

        //   const max = Math.max.apply(null, num);
        //   console.log('max', max)

        //   dieta.id_dieta = 1;

        //   console.log('dddd', dieta)

        //   this.createdieta$ = this.dietaService.createDieta(dieta).subscribe(resul => {
        //     console.log(resul)
        //     this.getdietas$ = this.dietaService.getDietas().subscribe(entry => {
        //       console.log(entry);
        //     });
        //   });
        // }
      }
      
    });


        // this.createdieta$ = this.dietaService.createDieta().subscribe(entry => {
    //   this.data = entry.dieta;
    //   console.log('entry', this.data)
    // });
    
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    });

  }

  cancelar(){
    this.router.navigateByUrl('dietas')
  }

}
