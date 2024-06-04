// src/app/services/signalr.service.ts
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  private fileId: string;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://studentguidebe.azurewebsites.net/chathub")
      .build();
  }

  public startConnection(fileId: string): Promise<void> {
    this.fileId = fileId;
    debugger;
    return this.hubConnection
    .start()
    .then(() => {
      console.log('000000000000');
      return this.hubConnection.invoke("AddToGroup", this.fileId, "simplenote");
    })
    // .then(() => {
    //   // Thực hiện các công việc khác sau khi invoke("AddToGroup") hoàn thành
    //   console.log('Successfully added to group.');
    //   // Gọi logic tiếp theo tại đây nếu cần
    // })
    .catch(err => console.error('Error starting or adding to group:', err));
  
  }

  onReceiveMessage(message : any): void {
   
    this.hubConnection.on("ReceiveMessage", function (x) {
      console.log("messageee ne0",x);
    })
}
  



  public sendMessage(note: string, file: number): void {
    console.log('333333', file);
    let dataMessage = {
        Id: file,
        content: note
    };

    const jsonString = JSON.stringify(dataMessage); // Convert object to JSON string
    console.log('JSON String:', jsonString);

    this.hubConnection
        .invoke("SendMessage", "simplenote", jsonString)
        .catch(err => console.error('err sending : ' + err));
    //   } else {

    //   }
}

}
