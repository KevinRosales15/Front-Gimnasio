import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { RutinaService } from 'src/app/services/rutina/rutina.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { rutina } from 'src/app/models/rutinamd';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-rutina',
  templateUrl: './rutina.component.html',
  styleUrls: ['./rutina.component.css']
})

export class RutinaComponent implements OnInit {
  rutina$: Subscription;

  listRutina: rutina[] = [];
  page_size: number = 5;
  page_number: number = 1;
  pageSizeOptions = [5,10,25,50,100];

  handlePage(e: PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  constructor(private rutinaService: RutinaService, private toastr: ToastrService) {  }

  ngOnInit(): void {
    this.getRutinas();
  }

  getRutinas() {
    this.rutina$ = this.rutinaService.getRutinas().subscribe(entry => {
      this.listRutina = entry.rutinas;
      console.log('datos rutinas', this.listRutina);
    });
  }

  DialogEliminarRutina(id: any){
    console.log('id a eliminar',id);
    Swal.fire({
      title:'Se eliminará la rutina',
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
        this.rutina$ = this.rutinaService.deleteRutina(id).subscribe(data => {
          this.toastr.error('La rutina fue eliminada con exíto', 'Rutina Eliminada!');
          this.getRutinas();
        })
      }
    })
  }

  VerRutina(id:any, nivel:any, dia:any, musculo:any, ejercicios:any){
    console.log('id a ver', id);
    Swal.fire({
      icon: 'info',
      title: 'Datos de rutina',
      html: `<b>Nivel</b>: ${nivel}<br><br><b>Día:</b> ${dia}<br><br><b>Músculo:</b> ${musculo}<br><br><b>Ejercicios:</b> ${ejercicios}`
    });
  }

  DialogEditarRutina(rutina: any){
    console.log('Rutina a editar', rutina);
    Swal.fire({
      html: `
        <h1 style="text-align: center; display: block; color: #3085d6;">Editar Rutina</h1><br>
        <form>
          <strong style="text-align: left; display: block;"> ID rutina </strong><br>
          <input type="number" id="id_rutina" value="${rutina.id_rutina}"  class="form-control" disabled ><br>
          <strong style="text-align: left; display: block;"> ID objetivo </strong><br>
          <input type="number"  id="id_objetivo"  value="${rutina.id_objetivo}"   class="form-control"><br>
          <strong style="text-align: left; display: block;"> ID dieta </strong><br>
          <input type="text"  id="id_dieta"  value="${rutina.id_dieta}"   class="form-control"><br>
          <strong style="text-align: left; display: block;"> Nivel </strong><br>
          <input type="number" id="nivel"  value="${rutina.nivel}"  class="form-control " ><br>
          <strong style="text-align: left; display: block;"> Día </strong><br>
          <input type="text" id="dia" value="${rutina.dia}"  class="form-control" ><br>
          <strong style="text-align: left; display: block;"> Músculo </strong><br>
          <input type="text"  id="musculo"  value="${rutina.musculo}"   class="form-control"><br>
          <strong style="text-align: left; display: block;"> Ejercicios </strong><br>
          <input type="text"  id="ejercicios"  value="${rutina.ejercicios}"   class="form-control"><br>
        </form>
      `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#858585',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(result =>{
      if(result.value){
        const id_rutina = (<HTMLInputElement>document.getElementById("id_rutina")).value;
        const id_objetivo = (<HTMLInputElement>document.getElementById("id_objetivo")).value;
        const id_dieta = (<HTMLInputElement>document.getElementById('id_dieta')).value;
        const nivelRutina = (<HTMLInputElement>document.getElementById("nivel")).value;
        const dia = (<HTMLInputElement>document.getElementById('dia')).value;
        const musculo = (<HTMLInputElement>document.getElementById('musculo')).value;
        const ejercicios = (<HTMLInputElement>document.getElementById("ejercicios")).value;
        const id = rutina._id;
        const idRutina = Number(id_rutina);
        const idObjetivo = Number(id_objetivo);
        const nivel = Number(nivelRutina);
        const RutinaUpdate = {id,idRutina, idObjetivo, id_dieta, nivel, dia, musculo, ejercicios};
        console.log("objeto para Update",RutinaUpdate);
        this.rutina$ = this.rutinaService.updateRutina(RutinaUpdate).subscribe(data => {
          this.toastr.info('La rutina fue editada con exíto', 'Rutina Editada!');
          this.getRutinas();
        })
      }
    })

  }

  ngOnDestroy(): void {
    this.rutina$.unsubscribe();
  }
}
