import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _Router: Router,
    private _LoginService: LoginService,
    private _ToastrService: ToastrService
  ) {}
  matcher = new MyErrorStateMatcher();
  hidePass: boolean = true;
  hidePassCon: boolean = true;

  registeForm!: FormGroup;
  fildes = Fileds;
  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.registeForm = this._fb.group(
      {
        [Fileds.username]: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(16),
          ],
        ],
        [Fileds.email]: ['', [Validators.required, Validators.email]],
        [Fileds.password]: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
          ],
        ],
        [Fileds.confirmPassword]: ['', [Validators.required]],
        [Fileds.role]: ['user'],
      },
      { validators: this.checkPassword }
    );
  }

  checkPassword = (group: AbstractControl): void => {
    const password = group.get(Fileds.password)?.value;
    const passwordConfirm = group.get(Fileds.confirmPassword)?.value;
    password !== passwordConfirm
      ? group.get(Fileds.confirmPassword)?.setErrors({ notsame: true })
      : ''; // when no error return null else return notSame true
  };

  register(formData: FormGroup): void {
    const { username, email, password, role } = this.registeForm.value;

    if (formData.valid) {
      this._LoginService
        .createAccount({ username, email, password, role })
        .subscribe({
          next: (response) => {
            this._ToastrService.success('Registration Successfully', 'Success');
            this._Router.navigate(['/login']);
          },
        });
    }
  }

  public get userRequired(): boolean {
    return this.registeForm.get(Fileds.username)?.hasError('required')!;
  }

  public get userMax(): boolean {
    return this.registeForm.get(Fileds.username)?.hasError('maxlength')!;
  }

  public get userMin(): boolean {
    return this.registeForm.get(Fileds.username)?.hasError('minlength')!;
  }

  public get emailRequired(): boolean {
    return this.registeForm.get(Fileds.email)?.hasError('required')!;
  }

  public get emailFormat(): boolean {
    return this.registeForm.get(Fileds.email)?.hasError('email')!;
  }

  public get passwordRequired(): boolean {
    return this.registeForm.get(Fileds.password)?.hasError('required')!;
  }

  public get passwordMin(): boolean {
    return this.registeForm.get(Fileds.password)?.hasError('minlength')!;
  }

  public get passwordMax(): boolean {
    return this.registeForm.get(Fileds.password)?.hasError('maxlength')!;
  }

  public get passwordConRequired(): boolean {
    return this.registeForm.get(Fileds.confirmPassword)?.hasError('required')!;
  }

  public get passwordConfirm(): boolean {
    return this.registeForm.get(Fileds.confirmPassword)?.hasError('notsame')!;
  }
}
