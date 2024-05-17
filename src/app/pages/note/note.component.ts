import { Component } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {
  noteContent: string = '';

  saveNote() {
    // Implement logic to save the note (e.g., send it to a backend server)
    console.log('Note content:', this.noteContent);
    // You can add further logic here, such as sending the note content to a backend API
  }
}
