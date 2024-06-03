import { Component, OnInit, ViewChild } from '@angular/core';
import { University } from 'src/core/models/database/db.model';
import { UnversityService } from 'src/core/services/unversity.service';
import { HttpClient } from '@angular/common/http';
import { Any } from 'json2typescript';
import { MajorService } from 'src/core/services/major.service';
import { SemesterService } from 'src/core/services/semester.service';
import { LoginService } from 'src/core/services/login/login.service';
import { ToastComponent } from '@syncfusion/ej2-angular-notifications';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public position = { X: 'Right' };
  public header : string ='';
  public titlee : string ='';
  @ViewChild('element') element: ToastComponent;
  selectedUniversity: string; 
  selectedMajor : string;
  password : any;
  repass : any;
  inputFirstName : any;
  inputLastName : any;
  inputEmail : any;
  checkPass : boolean = false;
  listUni : Array<any>=[];
  listMajor : Array<any>=[];
  listSemester : Array<any>=[];
  fieldUni : Object ={text:"universityName",value:"universityId"}
  fieldMajor: Object ={text:"name",value:"majorId"}
  fieldSemester: Object ={text:"semesterName",value:"semesterId"}
  constructor(private readonly serviceUinversity : UnversityService,private httpClient:HttpClient, private readonly serviceMajor : MajorService, private readonly serviceSemester : SemesterService, private readonly registerService : LoginService) {}

  onFirstNameChange(event: any){
    this.inputFirstName = event.target.value;
  }
  onLastNameChange(event: any){
    this.inputLastName = event.target.value;
  }
 
  onUniversityChange(event: any) {
    this.selectedUniversity = event.value; 
    this.serviceMajor.getMajorById(parseInt(this.selectedUniversity)).subscribe((res) => {
      this.listMajor = res.data;
    })
  }
  onMajorChange(event: any) {
    this.selectedMajor = event.value;
    this.serviceSemester.getMSemesterByIdUniAndIdMajor(parseInt(this.selectedUniversity),parseInt(this.selectedMajor)).subscribe((res) => {
      this.listSemester = res.data;
    })
  }
  onPassChange(event:any){
    this.password = event.target.value;
  }
  onRepassChange(event:any){
    this.repass = event.target.value;
    if(this.repass != this.password){
      this.checkPass = true;
    }
    else{
      this.checkPass = false;
    }
  }
  onEmailChange(event:any){
    this.inputEmail = event.target.value;
  }
  ngOnInit() {
    this.loadUniversity();
  }
  loadUniversity() {
    this.serviceUinversity.getAllUniversity().subscribe((res) => {
      console.log("universities",res)
      if(res.statusCode == 200){
      this.listUni = res.data;
      }
    });
   
  }
  onSubmit(){
    console.log(this.inputEmail);
    console.log(this.password);
    console.log(this.repass);
    console.log(this.inputFirstName);
    console.log(this.inputLastName);
    console.log(this.selectedUniversity);
    console.log(this.selectedMajor);
    console.log(this.listSemester[0].semesterId);
    if(this.checkPass == false){
      let formData = {
        firstname : this.inputFirstName,
        lastname : this.inputLastName,
        email : this.inputEmail,
        password : this.password,
        rePassword : this.repass,
        universityId : parseInt(this.selectedUniversity),
        majorId : parseInt(this.selectedMajor),
        semesterId : parseInt(this.listSemester[0].semesterId)
      }
      this.registerService.register(formData).subscribe((res) => {
        this.header = "Successfully";
        this.titlee = "Your account has been created successfully";
        this.element.show();
        window.location.href = '/hi/login';
      });
      this.header = "Successfully";
      this.titlee = "Your account has been created successfully";
      this.element.show();
      setTimeout(() => {
        window.location.href = '/hi/login';
      }, 5000); 
    }
  
  }
  onCreate(event: any) {
    this.element.show();
  }
}
  
