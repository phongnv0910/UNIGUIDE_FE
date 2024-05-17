import { Component, OnInit } from '@angular/core';
import { University } from 'src/core/models/database/db.model';
import { UnversityService } from 'src/core/services/unversity.service';
import { HttpClient } from '@angular/common/http';
import { Any } from 'json2typescript';
import { MajorService } from 'src/core/services/major.service';
import { SemesterService } from 'src/core/services/semester.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  selectedUniversity: string; 
  selectedMajor : string;
  password : any;
  repass : any;
  checkPass : boolean = false;
  listUni : Array<any>=[];
  listMajor : Array<any>=[];
  listSemester : Array<any>=[];
  fieldUni : Object ={text:"universityName",value:"universityId"}
  fieldMajor: Object ={text:"name",value:"majorId"}
  fieldSemester: Object ={text:"semesterName",value:"semesterId"}
  constructor(private readonly serviceUinversity : UnversityService,private httpClient:HttpClient, private readonly serviceMajor : MajorService, private readonly serviceSemester : SemesterService) {}

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
}
  
