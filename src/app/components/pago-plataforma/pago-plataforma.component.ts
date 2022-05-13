import { Component, OnInit, OnDestroy } from '@angular/core';
import { PagoPlataformaService } from 'src/app/services/pago-plataforma/pago-plataforma.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-pago-plataforma',
  templateUrl: './pago-plataforma.component.html',
  styleUrls: ['./pago-plataforma.component.css']
})
export class PagoPlataformaComponent implements OnInit {
  cardForm: FormGroup;
  validCard: boolean;
  validEmail: boolean;
  montoMora: number = 0;
  mensualidad: number = 0;
  montoTotal: number = 0;

  constructor(private PagoPlataformaService: PagoPlataformaService, private fb: FormBuilder, private toastr: ToastrService) { 
    this.cardForm = this.fb.group({
      cardHolder: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expMonth: ['', Validators.required],
      expYear: ['', Validators.required],
      cvc: ['', Validators.required],
      mensualidad: ['', Validators.required],
      montoMora: ['', Validators.required],
      total: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  verifyNumber$: Subscription;
  verifyEmail$: Subscription;

  ngOnInit(): void {
  }

  verificarEmail() {
    let email = this.cardForm.value.email;

    if (String(email).length != 0) {
      this.verifyEmail$ = this.PagoPlataformaService.verifyEmail(email).subscribe(entry => {
        if (entry.inDatabase == 'false') {
          this.toastr.warning('El email no se encuentra asociado a una cuenta','Warning!!');
          this.validEmail = false;
        } else {
          this.validEmail = true;
          this.mensualidad = entry.mensualidad;
          this.montoMora = entry.montoMora;
          this.montoTotal = this.mensualidad + this.montoMora;
        }
      });
    }
  }

  verificarTarjeta() {
    let val = this.cardForm.value.cardNumber;
    
    if (String(val).length == 16) {
      this.verifyNumber$ = this.PagoPlataformaService.verifyTarjeta(val).subscribe(entry => {
        if (entry.result == 'invalid') {
          this.toastr.warning('El número de tarjeta de crédito es inválido','Warning!!');
          this.validCard = false;
        } else {
          this.validCard = true;
        }
      }); 
    }
  }

  realizarPago() {
    if (!this.validCard) {
      this.toastr.info('Invalid Credit Card!','Verify Information!');
    } else if (!this.validEmail) {
      this.toastr.info('Invalid Email!','Verify Information!');
    } else {
      this.toastr.success('Successfull Payment!','Su pago se ha realizado con éxito!!!');
    }
  }

  ngOnDestroy(){
    this.verifyNumber$.unsubscribe;
    this.verifyEmail$.unsubscribe;
  }

}
