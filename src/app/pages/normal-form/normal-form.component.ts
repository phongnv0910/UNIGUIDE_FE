import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import * as signalR from "@microsoft/signalr";
import { TodolistService } from 'src/core/services/todolist.service';

@Component({
  selector: 'app-normal-form',
  templateUrl: './normal-form.component.html',
  styleUrls: ['./normal-form.component.scss']
})
export class NormalFormComponent implements OnInit {
  public toolbarOptions: ToolbarItems[] = ["Add", "Edit", "Delete"];
  inputTask : any;
  inputDue : any;
  inputStatus : any;
  private fileId = this.route.snapshot.paramMap.get("formId");
  public editSettings?: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Dialog',
  };
  field = { text: 'text',value: 'value' };
  listStatus = [
    {text : 'Not Start',value : 0},
    {text : 'Complete',value : 1},
  ]
  public data: Array<any>=[];

  private connection: signalR.HubConnection;

  constructor(private route: ActivatedRoute,private readonly serviceToDo : TodolistService) {
  }

  ngOnInit() {
   this.getToDoList();
  }
  renderStatus(value){
    if(value == false){
      return "Not Start"
    }else{
      return "Complete"
    }
  }
  actionBegin(args: any) {
    console.log("logging", args);
    if (args.requestType === "save" && args.action === "edit") {
      console.log("Update")
    }
    if(args.requestType === "save" && args.action === "add"){
      console.log("Created")
    }
    if(args.requestType === "delete"){
      console.log("Deleted")
    }
  }
getToDoList(){
  this.serviceToDo.getAllToDoList(this.fileId).subscribe((data)=>{
    this.data = data.data;
  })
}
  onChangeStatus(value: any) {
    this.inputStatus = value.value;
  }
  onChangeTask(value: any) {  
   this.inputTask = value.value;
  }
  onChangeDue(value: any) {
   this.inputDue = value.value;
  }
}
