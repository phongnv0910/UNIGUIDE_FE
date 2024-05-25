import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SignalRService } from 'src/core/services/signalr.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy {
  noteContent: string;
  private fileId =  this.route.snapshot.paramMap.get('noteId');
  private routeSub: Subscription;
  private timeoutId: any;
  private isConnected: boolean = false;
  @ViewChild('quillEditor') quillEditor: any;
  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']
    ]
  };
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
          this.signalRService.listenForMessages((message: string) => {
            this.noteContent = message;
          });
        }).catch(error => {
          console.error('Error starting SignalR connection:', error);
        });
      }
    });
  }
  onEditorCreated(editor) {
    console.log("note",this.noteContent)
    const savedNote = this.noteContent;

    if (savedNote) {
      editor.clipboard.dangerouslyPasteHTML(savedNote);
    }
  }
  onInput(): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      debugger;
      if (this.isConnected) {
        this.signalRService.sendMessage(this.noteContent, parseInt(this.fileId));
      } else {
        console.error('SignalR connection is not in the Connected state.');
      }
    }, 300);
  }
  
  onNoteContentChange(event: any) {
    // Lưu nội dung ghi chú vào localStorage
    localStorage.setItem('savedNote', this.noteContent);
     console.log('Note content saved:', this.noteContent);
  }
  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
