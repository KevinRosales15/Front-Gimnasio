import { Component, OnInit } from '@angular/core';
import { DietasService } from 'src/app/services/dietas/dietas.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Dieta } from 'src/app/models/dieta';


@Component({
  selector: 'app-dietas',
  templateUrl: './dietas.component.html',
  styleUrls: ['./dietas.component.css']
})
export class DietasComponent implements OnInit {
  dieta$: Subscription;

  listDieta: Dieta[] = [];
  page_size: number = 5;
  page_number: number = 1;
  pageSizeOptions = [5,10,25,50,100];
  identificador: number;

  handlePage(e: PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  constructor(private dietaService: DietasService, private toastr: ToastrService, private router: Router) {  }

  ngOnInit(): void {
    try {
      this.identificador = history.state.blocker;
    } catch (error) { this.identificador = 0; }
    
    if (this.identificador != 1 && this.identificador != 2 && this.identificador != 3) {
      this.router.navigate(['/login']);
    }
    this.getDietas();
  }

  volver() {
    if (this.identificador == 1) {
      this.router.navigate(['/master'], {state: {blocker: this.identificador}});
    } else if (this.identificador == 2) {
      this.router.navigate(['/administrador'], {state: {blocker: this.identificador}});
    } else if (this.identificador == 3) {
      this.router.navigate(['/instructor'], {state: {blocker: this.identificador}});
    }
  }

  crear() {
    this.router.navigate(['/crear_dieta'], {state: {blocker: this.identificador}});
  }

  getDietas() {
    this.dieta$ = this.dietaService.getDietas().subscribe(entry => {
      this.listDieta = entry.dieta;
      console.log('datos dietas', this.listDieta);
    });
  }

  DialogEliminarDieta(id: any){
    console.log('id a eliminar',id);
    Swal.fire({
      title:'Se eliminará la dieta',
      text: 'Esta acción no puede revertirse',
      icon: 'warning',
      iconColor: 'red',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result =>{
      if(result.value){
        this.dieta$ = this.dietaService.deleteDieta(id).subscribe(data => {
          this.toastr.error('La dieta fue eliminada con exíto', 'Dieta Eliminada!');
          this.getDietas();
        })
      }
    })
  }

  VerDieta(id:any, nivel:any, tiempo:any, alimentos:any, carbohidratos:any, proteinas:any, peso:any){
    console.log('id a ver', id);
    Swal.fire({
      icon: 'info',
      title: 'Datos de dieta',
      html: `<b>Nivel</b>: ${nivel}<br><br><b>Tiempo:</b> ${tiempo}<br><br><b>Alimentos:</b> ${alimentos}<br><br><b>Carbohidratos:</b> ${carbohidratos} g.<br><br><b>Proteinas:</b> ${proteinas} g.<br><br><b>Peso:</b> ${peso} g.`
    });
  }

  DialogEditarDieta(dieta: any){
    console.log('Dieta a editar', dieta);
    Swal.fire({
      html: `
        <h1 style="text-align: center; display: block; color: #3085d6;">Editar Dieta</h1><br>
        <form>
          <strong style="text-align: left; display: block;"> ID dieta </strong><br>
          <input type="number" id="id_dieta" value="${dieta.id_dieta}"  class="form-control" disabled ><br>
          
          <strong style="text-align: left; display: block;"> ID objetivo </strong><br>
          <input type="number"  id="id_objetivo"  value="${dieta.id_objetivo}"   class="form-control"><br>

          <strong style="text-align: left; display: block;"> ID dieta </strong><br>
          <input type="number"  id="nivel"  value="${dieta.nivel}"   class="form-control"><br>

          <strong style="text-align: left; display: block;"> Nivel </strong><br>
          <input type="text" id="tiempo"  value="${dieta.tiempo}"  class="form-control " ><br>
          
          <strong style="text-align: left; display: block;"> Día </strong><br>
          <input type="text" id="alimentos" value="${dieta.alimentos}"  class="form-control" ><br>

          <strong style="text-align: left; display: block;"> Músculo </strong><br>
          <input type="number"  id="carbohidratos"  value="${dieta.carbohidratos}"   class="form-control"><br>

          <strong style="text-align: left; display: block;"> Ejercicios </strong><br>
          <input type="number"  id="proteinas"  value="${dieta.proteinas}"   class="form-control"><br>

          <strong style="text-align: left; display: block;"> Ejercicios </strong><br>
          <input type="number" id="peso"  value="${dieta.peso}"   class="form-control"><br>
        </form>
      `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#858585',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(result =>{
      if(result.value){
        const iddieta = (<HTMLInputElement>document.getElementById("id_dieta")).value;
        const idobjetivo = (<HTMLInputElement>document.getElementById("id_objetivo")).value;
        const nivel_d = (<HTMLInputElement>document.getElementById('nivel')).value;
        
        const tiempo = (<HTMLInputElement>document.getElementById('tiempo')).value;
        const alimentos = (<HTMLInputElement>document.getElementById('alimentos')).value;
        
        const Carbohidratos = (<HTMLInputElement>document.getElementById("carbohidratos")).value;
        const Proteinas = (<HTMLInputElement>document.getElementById("proteinas")).value;
        const Peso = (<HTMLInputElement>document.getElementById("peso")).value;
        
        const id = dieta._id;

        const id_dieta = Number(iddieta);
        const id_objetivo = Number(idobjetivo);
        const nivel = Number(nivel_d);

        const carbohidratos = Number(Carbohidratos);
        const proteinas = Number(Proteinas);
        const peso = Number(Peso);




        const DietaUpdate = {id, id_dieta, id_objetivo, nivel, tiempo, alimentos, carbohidratos, proteinas, peso};
        console.log("objeto para Update",DietaUpdate);
        this.dieta$ = this.dietaService.updateDieta(DietaUpdate).subscribe(data => {
          this.toastr.info('La dieta fue editada con exíto', 'Dieta Editada!');
          this.getDietas();
        })
      }
    })

  }

  ngOnDestroy(): void {
    this.dieta$.unsubscribe();
  }
}
