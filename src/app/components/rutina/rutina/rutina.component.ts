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

  ngOnDestroy(): void {
    this.rutina$.unsubscribe();
  }
}
