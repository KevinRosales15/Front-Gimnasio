import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-registro-empleados',
  templateUrl: './registro-empleados.component.html',
  styleUrls: ['./registro-empleados.component.css']
})
export class RegistroEmpleadosComponent implements OnInit {

  constructor(private AuthService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onRegister(form: { value: UserI; }): void {
    this.AuthService.registro_empleados(form.value).subscribe(res => {
      this.router.navigateByUrl('/components/login_empleados');
    });
  }

}
