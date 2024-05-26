import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { SignalRService } from "src/core/services/signalr.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import * as signalR from "@microsoft/signalr";
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.scss"],
})
export class NoteComponent implements OnInit, OnDestroy {
  noteContent: string = "";
  private noteContentBuffer: string = "";
  private fileId = this.route.snapshot.paramMap.get("noteId");
  private routeSub: Subscription;
  private timeoutId: any;
  private isConnected: boolean = false;
  private connection: signalR.HubConnection;

  @ViewChild(QuillEditorComponent) quillEditor: QuillEditorComponent;

  constructor(
    private signalRService: SignalRService,
    private route: ActivatedRoute
  ) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7144/chathub")
      .build();
  }

  ngOnInit() {
    if (this.fileId) {
      var id = this.fileId + " ";
      console.log("id", this.connection);
      
      this.connection.start()
        .then(() => {
          return this.connection.invoke("AddToGroup", id, "simplenote");
        })
        .catch((err) => {
          return console.error(err.toString());
        });

      this.connection.on("ReceiveMessage", (message) => {
        console.log("message", message);
        this.updateEditorContent(message);
      });
    }
  }

  updateEditorContent(savedNote: string) {
    if (this.quillEditor && this.quillEditor.quillEditor) {
      this.quillEditor.quillEditor.clipboard.dangerouslyPasteHTML(savedNote);
    }
  }

  onInput1(): void {
    this.noteContentBuffer = this.quillEditor.quillEditor.root.innerHTML; 
    console.log("22222222", this.noteContentBuffer);
  
    let timeoutId;
    clearTimeout(timeoutId);
  
    timeoutId = setTimeout(() => {
      console.log("id fiile", this.fileId);
      let dataMessage = {
        Id: this.fileId + " ",
        content: this.noteContentBuffer 
      };
      console.log('data:', dataMessage);
  
      const jsonString = JSON.stringify(dataMessage);
      console.log('JSON String:', jsonString);
  
      this.connection
        .invoke("SendMessage", "simplenote", jsonString)
        .catch(err => console.error('err sending : ' + err));
    }, 600);
  }

  onInput(args: any): void {
    let dataMessage = {
      Id: this.fileId,
      content: args.html
    };

    const jsonString = JSON.stringify(dataMessage); // Convert object to JSON string
    console.log('JSON String:', jsonString);
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.connection) {
      this.connection.stop().then(() => console.log('Connection stopped.'));
    }
  }
}