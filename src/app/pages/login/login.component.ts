import { Component, OnInit, OnDestroy,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { EmailValidators } from 'ngx-validators'
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  UntypedFormControl,
} from '@angular/forms';
import { LoginService } from 'src/core/services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { UserLogged } from 'src/core/ultils/userLogged';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
  public router: Router;
  public form: UntypedFormGroup;
  public email: UntypedFormControl;
  public password: UntypedFormControl;
  constructor(
    router: Router,
    fb: UntypedFormBuilder,
    private readonly loginService : LoginService,
    private toastService : ToastrService
  ) { 
  //   setTimeout(() => {
  //   jQuery('#videoCompressorModal').modal('hide');
  // }, 200);
  this.router = router;
  this.form = fb.group({
    'email': ['', Validators.compose([Validators.required, EmailValidators.normal])],
    'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
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
      console.log("res in login",res);
      if(res.data == ""){
        this.toastService.error("Email or Password is not correct!")
      }
      else{
        let userLogged: UserLogged = new UserLogged();
        userLogged.setCurrentUser(res.data);
      }
    })
  }

}
