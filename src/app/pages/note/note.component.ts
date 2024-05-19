import { Component } from '@angular/core';
import { NoteService } from 'src/core/services/note/note.service';
import { ToastrService } from 'ngx-toastr';
import { ChatService } from 'src/core/services/chat/chat.service'; // Import the ChatService

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {
  noteContent: string = '';
  chatMessages: any[] = []; // Add chatMessages array
  userInput: string = ''; // Add userInput string

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
    private noteService: NoteService,
    private toastService: ToastrService,
    private chatService: ChatService // Inject the ChatService
  ) {}

  saveNote() {
    const formData = { content: this.noteContent };

    this.noteService.note(formData).subscribe({
      next: response => {
        console.log('Response from server:', response);
        this.toastService.success("Note submitted successfully!");
      },
      error: error => {
        console.error('Error:', error);
        this.toastService.error("There was an error submitting your note. Please try again.");
      }
    });
  }

  closeChat() {
    // Implement the logic to close the chat here
    console.log('Closing chat...');
  }
  

}
