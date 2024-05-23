import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule, routes } from './app.routing'; // Import routes
import { ComponentsModule } from './components/components.module';
import { NoteComponent } from './pages/note/note.component';
import { HostelComponent } from './pages/hostel/hostel.component'; 
import { QuillModule } from 'ngx-quill';
import { BrowserModule } from '@angular/platform-browser';
import { ToastAllModule, ToastModule } from '@syncfusion/ej2-angular-notifications';
import { DialogModule } from '@syncfusion/ej2-angular-popups';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    AppRoutingModule,
    BrowserModule,
    DialogModule,
    QuillModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: false }) // Use the imported routes
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    NoteComponent,
    HostelComponent
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
