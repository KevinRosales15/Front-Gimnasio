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
    } catch (error) {}
    if (this.identificador != 1) {
      this.router.navigate(['/login']);
    }
    console.log(this.identificador);
  }

}
