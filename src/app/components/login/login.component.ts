import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');;
  
  constructor(private LoginService:LoginService , private fb: FormBuilder, private toastr: ToastrService, public router: Router) { 
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  logIn$: Subscription;
  verifyMora$: Subscription;

  ngOnInit(): void {
    this.verifyMora();
  }


  verifyMora(){
    this.verifyMora$ = this.LoginService.verifyMora({date: this.currentDate}).subscribe(entry => {});
  }

  logIn() {
    this.logIn$ = this.LoginService.logIn(this.loginForm.value).subscribe(entry => {
      if (entry.rol != null) {
        this.toastr.success(entry.message, 'Successfull Login!!!');
        this.router.navigate(['/' + entry.rol]);

      } else if (entry.message == 'Email no asociado') {
        this.toastr.warning('El email no se encuentra asociado a una cuenta', 'Warning!!');

      } else if (entry.message == 'Contraseña Incorrecta') {
        this.toastr.warning(entry.message, 'Warning!!');

      } else {
        this.toastr.error("Ha ocurrido un error inesperado", 'Error!');
      } 
    });
  }

  ngOnDestroy(){
    this.logIn$.unsubscribe;
    this.verifyMora$.unsubscribe;
  }

}
