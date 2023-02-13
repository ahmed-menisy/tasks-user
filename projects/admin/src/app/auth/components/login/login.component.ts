import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { fileds } from '../../../core/enums/enums';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: AbstractControl<any, any> | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _LoginService: LoginService,
    private _Router: Router,
    private _toastr: ToastrService,
    private _translate: TranslateService
  ) {}

  formLogin!: FormGroup;
  formFiled = fileds;
  hide: boolean = true;
  isLogin: boolean = false;
  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formLogin = this._fb.group({
      [fileds.email]: ['', [Validators.required, Validators.email]],
      [fileds.password]: [
        '',
        [Validators.required, Validators.pattern('[0-9]{3,8}')],
      ],
      [fileds.role]: ['admin'],
    });
  }

  login(obj: FormGroup): void {
    if (obj.valid) {
      this.isLogin = true;
      this._LoginService.setLogin(obj.value).subscribe({
        next: (response) => {
          if (!response.message) {
            this._toastr.success(
              this._translate.instant('toaster.logSucces'),
              this._translate.instant('toaster.titleSucess')
            );
            this._Router.navigate(['/']);
            localStorage.setItem('_uData', JSON.stringify(response));
          } else {
          }
        },
        error: (error) => {
          this.isLogin = false;
        },
        complete: () => {
          this.isLogin = false;
        },
      });
    }
  }
}
