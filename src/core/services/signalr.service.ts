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
      .withUrl("https://localhost:7144/chathub")
      .build();
  }

  public startConnection(fileId: string): Promise<void> {
    this.fileId = fileId;
    debugger;
    return this.hubConnection
      .start()
      .then(() => this.hubConnection.invoke("AddToGroup", this.fileId))
      .catch(err => console.error('err starting: ' + err));
  }

  public listenForMessages(callback: (message: string) => void): void {
    
    this.hubConnection.on("ReceiveMessage", callback);
  }



  public sendMessage(note: string, file: number): void {
    // if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
    console.log('333333', file);
    // const notes = note;
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
