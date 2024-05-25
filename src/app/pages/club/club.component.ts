import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { ClubService } from 'src/core/services/club.service';
import { UnversityService } from 'src/core/services/unversity.service';
@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent implements OnInit {
  public listClub : Array<any> =[];
  @ViewChild('ejDialog') ejDialog: DialogComponent | any;
  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef | any;
  // The Dialog shows within the target element.
  public hideDialog: EmitType<object> = () => {
    this.ejDialog.hide();
  };

  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  };
  public targetElement?: HTMLElement;
  constructor(private readonly service : ClubService,private serviceU : UnversityService) { }
  // public initilaizeTarget: EmitType<object> = () => {
  //   this.targetElement = this.container.nativeElement.parentElement;
  // }
  ngOnInit(): void {
   //  this.ejDialog.hide();
   this.loadClub();
  }
  public onOpenDialog = (event: any): void => {
    this.ejDialog.show();
};
close(){
  this.ejDialog.hide();
}
loadClub(){
  this.service.getClub().subscribe((data)=>{
    console.log("data res",data.data);
    this.listClub = data.data
  })
}
getaaa(value: any){
  debugger;
  console.log(value);
  debugger;
  this.serviceU.getAllUniversity().subscribe((data)=>{
    console.log("data res",data.data);
  })
}
}
