import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Fileds } from '../../../core/enums/enum';
import { LoginService } from '../../services/login.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
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
export class LoginComponent {
  constructor(
    private _fb: FormBuilder,
    private _Router: Router,
    private _LoginService: LoginService,
    private _ToastrService: ToastrService,
    private _TranslateService: TranslateService
  ) {}
  matcher = new MyErrorStateMatcher();
  hidePass: boolean = true;
  hidePassCon: boolean = true;

  loginForm!: FormGroup;
  fildes = Fileds;
  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this._fb.group({
      [Fileds.email]: ['', [Validators.required, Validators.email]],
      [Fileds.password]: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      [Fileds.role]: ['user'],
    });
  }

  logIn(formData: FormGroup): void {
    if (formData.valid) {
      this._LoginService.logIn(formData.value).subscribe({
        next: (response) => {
          this._ToastrService.success(
            this._TranslateService.instant('toaster.logSucces'),
            this._TranslateService.instant('toaster.titleSucess')
          );
          localStorage.setItem('_Data', JSON.stringify(response));
          this._Router.navigate(['/tasks']);
        },
      });
    }
  }

  public get emailRequired(): boolean {
    return this.loginForm.get(Fileds.email)?.hasError('required')!;
  }

  public get emailFormat(): boolean {
    return this.loginForm.get(Fileds.email)?.hasError('email')!;
  }

  public get passwordRequired(): boolean {
    return this.loginForm.get(Fileds.password)?.hasError('required')!;
  }

  public get passwordMin(): boolean {
    return this.loginForm.get(Fileds.password)?.hasError('minlength')!;
  }

  public get passwordMax(): boolean {
    return this.loginForm.get(Fileds.password)?.hasError('maxlength')!;
  }
}
