import { Component, OnInit, OnDestroy,ViewEncapsulation, ViewChild } from '@angular/core';
import { EmailValidators } from 'ngx-validators';
import { ToastComponent } from '@syncfusion/ej2-angular-notifications';
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
  public form: UntypedFormGroup;
  public email: UntypedFormControl;
  public password: UntypedFormControl;
  public checking = false;
  public position = { X: 'Right' };
  public header : string ='';
  public titlee : string ='';
  @ViewChild('element') element: ToastComponent;
  constructor(
    fb: UntypedFormBuilder,
    private readonly loginService : LoginService,
    private toastService : ToastrService
  ) { 
  this.form = fb.group({
    'email': ['', Validators.compose([Validators.required, EmailValidators.normal])],
    'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
  });

  this.email = this.form.controls['email'] as UntypedFormControl;
  this.password = this.form.controls['password'] as UntypedFormControl;}  
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  
  ngOnInit() {
  }

  onCreate(event: any) {
    this.element.show();
  }

  public onSubmit(values: any): void {
    this.loginService.login(values).subscribe(
      (res) => {
        console.log("Response from login:", res.data);
        if (res.data === "") {
          this.checking = true;
          this.header = "Error";
          this.titlee = "Your email or password is incorrect";
          this.element.show();
       
        } else {
          const userLogged: UserLogged = new UserLogged();
          userLogged.setCurrentUser(res.data);
          console.log("co token");
          this.header = "Successfully";
          this.titlee = "You login successfully";
          window.location.href = '/dashboard';
          this.element.show();
        }
      },
      (error) => {
      }
    );
  }
  

}
