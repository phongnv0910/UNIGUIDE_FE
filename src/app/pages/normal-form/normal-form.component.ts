import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import * as signalR from "@microsoft/signalr";
import { TodolistService } from 'src/core/services/todolist.service';
interface DataItem {
  Discontinued: boolean; 

}
@Component({
  selector: 'app-normal-form',
  templateUrl: './normal-form.component.html',
  styleUrls: ['./normal-form.component.scss']
})
export class NormalFormComponent implements OnInit {
  public toolbarOptions: ToolbarItems[] = ["Add", "Edit", "Delete"];
  inputTask : any;
  Discontinued: boolean;
  inputDue : any;
  inputStatus : any;
  data: DataItem[] = [
    { Discontinued: true },
    { Discontinued: false },
    // ... more data items
  ];
  private fileId = this.route.snapshot.paramMap.get("formId");
  public editSettings?: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Dialog',
  };
  // inputStatus : boolean;
  // inputTaskName : any;
  // inputDue : any;
  field = { text: 'text',value: 'value' };
  listStatus = [
    {text : 'Not Start',value : 0},
    {text : 'Complete',value : 1},
  ]
  public datas: Array<any>=[];

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
  onChangeStatus(event: Event, data: DataItem) {
    data.Discontinued = (event.target as HTMLInputElement).checked;
    console.log("Updated Discontinued status:", data);
    this.inputStatus = data.Discontinued;
  }
  actionBegin(args: any) {
    console.log("logging", args);
    if (args.action === "edit") {
      console.log("Update")
    }
    if(args.action === "add"){
      if(this.inputStatus == undefined ){
        this.inputStatus = false;
      }
      let formData = {
        status : this.inputStatus,
        taskname : this.inputTask,
        due :new Date(this.inputDue).toISOString(), 
        ToDoListNoteId: this.fileId
        
      }
      console.log("form data", formData)
     this.serviceToDo.createDo(formData).subscribe((data) => {
      alert("create succesfully");
      this.getToDoList();
    })
  }
    if(args.requestType === "delete"){
     // this.servicesToDo.DeleteToDoList()
     console.log("args", args);
     console.log("DeleteToDoList",args.data);
    }
  }
getToDoList(){
  this.serviceToDo.getAllToDoList(this.fileId).subscribe((data)=>{
    this.datas = data.data;
  })
}
  onChangeTask(value: any) {  
   this.inputTask = value.value;
  }
  onChangeDue(value: any) {
   this.inputDue = value.value;
  }
}
