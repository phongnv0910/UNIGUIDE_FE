import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalRService } from 'src/core/services/signalr.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy {
  noteContent: string = '';
  private fileId =  this.route.snapshot.paramMap.get('noteId');
  private routeSub: Subscription;
  private timeoutId: any;
  private isConnected: boolean = false;

  constructor(
    private signalRService: SignalRService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log("fileid",this.fileId);
    debugger;
    this.routeSub = this.route.queryParams.subscribe(params => {
     // this.fileId = params['fileid'];
      if (this.fileId) {
        this.signalRService.startConnection(this.fileId).then(() => {
          this.isConnected = true;
          console.log("connect succes")
          this.signalRService.listenForMessages((message: string) => {
            console.log("message",message);
            this.noteContent = message;
          });
        }).catch(error => {
          console.error('Error starting SignalR connection:', error);
        });
      }
    });
  }

  onInput(): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      debugger
      console.log('11111111',this.noteContent);
      if (this.isConnected) {
        console.log('2222222',this.noteContent);
        this.signalRService.sendMessage(this.noteContent,parseInt(this.fileId));
      } else {
        console.error('SignalR connection is not in the Connected state.');
      
      }
    }, 300);
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
  
}
