import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DietaService } from 'src/app/services/dieta/dieta.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.component.html',
  styleUrls: ['./dieta.component.css']
})

export class DietaComponent implements OnInit {
  displayedColumns: string[] = ['id_dieta', 'nivel', 'tiempo', 'alimentos', 'carbohidratos', 'proteinas', 'peso', 'actions'];
  data: Elements[] = []

  dieta: string;


  getdietas$: Subscription;
  deletedieta$: Subscription;
  createdieta$: Subscription;


  constructor(private dietaService: DietaService, private router:Router) {
    this.dieta = '';
  }

  ngOnInit(): void {
    this.getDietas();
    //this.deleteDieta();
  }

  getDietas() {
    this.getdietas$ = this.dietaService.getDietas().subscribe(entry => {
      this.data = entry.dieta;
      console.log('entry', this.data)
    });
  }

  createDieta() {
    // this.createdieta$ = this.dietaService.createDieta().subscribe(entry => {
    //   this.data = entry.dieta;
    //   console.log('entry', this.data)
    // });
    

  }

  getDieta() {

  }

  updateDieta() {
    console.log('dieta editada');
  }


  deleteDieta(dieta: any) {
    Swal.fire({
      title: 'Estas seguro de eliminar?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'Se ha eliminado exitosamente'
        );
        
        this.deletedieta$ = this.dietaService.deleteDieta(dieta._id).subscribe(rest => {
          console.log('dieta eliminada', dieta._id);

        });
      }
    });
    
    
  }

  ngOnDestroy(): void {
    this.getdietas$.unsubscribe();
    this.deletedieta$.unsubscribe();
    this.createdieta$.unsubscribe();
  }

}

export interface Elements {
  _id: string;
  id_dieta: number;
  id_objetivo: number;
  nivel: number;
  tiempo: string;
  alimentos: string;
  carbohidratos: number;
  proteinas: number;
  peso: number;
}
