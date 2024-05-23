import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent implements OnInit {
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
  constructor() { }
  // public initilaizeTarget: EmitType<object> = () => {
  //   this.targetElement = this.container.nativeElement.parentElement;
  // }
  ngOnInit(): void {
   //  this.ejDialog.hide();
  }
  public onOpenDialog = (event: any): void => {
    this.ejDialog.show();
};
close(){
  this.ejDialog.hide();
}
}
