import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserI } from 'src/app/models/user';


@Component({
  selector: 'app-login-empleados',
  templateUrl: './login-empleados.component.html',
  styleUrls: ['./login-empleados.component.css']
})
export class LoginEmpleadosComponent implements OnInit {

  constructor(private AuthService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onLogin(form: { value: UserI; }): void {
    this.AuthService.login(form.value).subscribe(res => {
      console.log('bienvenido');
    });
  }

}
