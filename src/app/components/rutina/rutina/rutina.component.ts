import { Component, OnInit} from '@angular/core';
import { RutinaService } from 'src/app/services/rutina/rutina.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ObjectTypeDeclaration } from 'typescript';

@Component({
  selector: 'app-rutina',
  templateUrl: './rutina.component.html',
  styleUrls: ['./rutina.component.css']
})

export class RutinaComponent implements OnInit {
  displayedColumns: string[] = ['id_rutina', 'nivel', 'dia', 'musculo', 'ejercicios', 'actions'];
  data: Elements[] = []

  rutina: string;
  rutina$: Subscription;

  constructor(private rutinaService: RutinaService) {
    this.rutina = '';
  }

  ngOnInit(): void {
    this.getRutinas();
  }

  getRutinas() {
    this.rutina$ = this.rutinaService.getRutinas().subscribe(entry => {
      this.data = entry.rutinas;
    });
  }

  ngOnDestroy(): void {
    this.rutina$.unsubscribe();
  }
}

export interface Elements {
  _id: string;
  id_rutina: number;
  id_objetivo: number;
  nivel: number;
  dia: string;
  musculo: string;
  ejercicios: string
}
