import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import * as signalR from "@microsoft/signalr";

@Component({
  selector: 'app-normal-form',
  templateUrl: './normal-form.component.html',
  styleUrls: ['./normal-form.component.scss']
})
export class NormalFormComponent implements OnInit {
  public toolbarOptions: ToolbarItems[] = ["Add", "Edit", "Delete", "Update", "Cancel"];
  private fileId = this.route.snapshot.paramMap.get("formId");
  public editSettings?: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Dialog',
  };
  
  public originalData: any[] = []; // Store original data
  public data: any[] = []; // Store current data

  private connection: signalR.HubConnection;

  constructor(private route: ActivatedRoute) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7144/chathub")
      .build();
  }

  ngOnInit() {
    console.log("id", this.fileId);
    if (this.fileId) {
      var id = this.fileId + " ";
      console.log("id", this.connection);

      this.connection.start()
        .then(() => {
          console.log("connected");
          return this.connection.invoke("AddToGroup", id, "todolist");
        })
        .catch((err) => {
          return console.error(err.toString());
        });

      // Use arrow function here to preserve the scope of 'this'
      this.connection.on("ReceiveMessage", (message) => {
        console.log("message", message);
        this.originalData = JSON.parse(message); // Store original data
        this.data = [...this.originalData]; // Set current data
        console.log("data", this.data);
      });
    }
  }

  actionBegin(args: any) {
    console.log("logging", args);
    if (args.requestType === "save" && args.action === "edit") {
      const editedItem = args.data;
      const originalItemIndex = this.originalData.findIndex(item => item.TaskName === editedItem.TaskName);
      if (originalItemIndex !== -1) {
        this.originalData[originalItemIndex] = editedItem;
        console.log('Updated original data:', this.originalData);
      }
      const jsonString = JSON.stringify(editedItem, null, 2);
      console.log('JSON String:', jsonString);

      this.connection
        .invoke("SendMessage", "todolist", jsonString)
        .catch(err => console.error('err sending : ' + err));
    }
  }

  onChangeStatus(value: any) {
    console.log("value", value);
  }
}
