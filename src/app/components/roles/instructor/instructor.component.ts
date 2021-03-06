import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css',
              '../../../../assets/roles/css/all.css',
              '../../../../assets/roles/css/mdb.min.css',
              '../../../../assets/roles/css/normalize.css']
})
export class InstructorComponent implements OnInit {
  identificador: number;

  constructor(public router: Router) { }

  ngOnInit(): void {
    try {
      this.identificador = history.state.blocker;
    } catch (error) { this.identificador = 0; }
    if (this.identificador != 3) {
      this.router.navigate(['/login']);
    }
  }

  accederRutinas() {
    this.router.navigate(['/rutinas'], {state: {blocker: this.identificador}});
  }
  
  accederClientes() {
    this.router.navigate(['/ListarClientes'], {state: {blocker: this.identificador}});
  }

  accederDietas() {
    /* this.router.navigate(['/'], {state: {blocker: this.identificador}}); */
  }

}
