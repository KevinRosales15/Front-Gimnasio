import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  constructor(private LoginService:LoginService , private fb: FormBuilder, private toastr: ToastrService) { 
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  logIn$: Subscription;

  ngOnInit(): void {
  }

  logIn() {
    this.logIn$ = this.LoginService.logIn(this.loginForm.value).subscribe(entry => {
      if (entry.message == 'Contraseña Incorrecta') {
        this.toastr.warning(entry.message, 'Warning!!');
      } else if (entry.message == 'Email no asociado') {
        this.toastr.warning('El email no se encuentra asociado a una cuenta', 'Warning!!');
      } else {
        this.toastr.success(entry.message, 'Successfull Login!!!');
      }
    });
  }

  ngOnDestroy(){
    this.logIn$.unsubscribe;
  }

}
