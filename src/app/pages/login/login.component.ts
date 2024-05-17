import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  UntypedFormControl,
} from '@angular/forms';
import { LoginService } from 'src/core/services/login/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public router: Router;
  public form: UntypedFormGroup;
  public email: UntypedFormControl;
  public password: UntypedFormControl;
  constructor(
    router: Router,
    fb: UntypedFormBuilder,
    private readonly loginService : LoginService
  ) { 
  //   setTimeout(() => {
  //   jQuery('#videoCompressorModal').modal('hide');
  // }, 200);
  this.router = router;
  this.form = fb.group({
    email: ['', Validators.compose([Validators.required])],
    password: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
  });

  this.email = this.form.controls['email'] as UntypedFormControl;
  this.password = this.form.controls['password'] as UntypedFormControl;}

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  public onSubmit(values: any): void {
    console.log("values",values)
    this.loginService.login(values).subscribe((res) => {
      console.log("res",res)
    })
  }

}
