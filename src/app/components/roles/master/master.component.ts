import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css',
              '../../../../assets/roles/css/all.css',
              '../../../../assets/roles/css/mdb.min.css',
              '../../../../assets/roles/css/normalize.css']
})
export class MasterComponent implements OnInit {
  identificador: number;

  constructor(public router: Router) {}

  ngOnInit(): void {
    try {
      this.identificador = history.state.blocker;
    } catch (error) { this.identificador = 0; }
    if (this.identificador != 1) {
      this.router.navigate(['/login']);
    }
  }

  accederSucursales() {
    this.router.navigate(['/listar-sucursal'], {state: {blocker: this.identificador}});
  }

  accederEmpleados() {
    this.router.navigate(['/lista-empleados'], {state: {blocker: this.identificador}});
  }

  accederClientes() {
    this.router.navigate(['/ListarClientes'], {state: {blocker: this.identificador}});
  }

  accederRutinas() {
    this.router.navigate(['/rutinas'], {state: {blocker: this.identificador}});
  }

  accederDietas() {
    /* this.router.navigate(['/'], {state: {blocker: this.identificador}}); */
  }

}
