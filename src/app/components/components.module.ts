import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { CheckBoxModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    DialogModule,
    CheckBoxModule,
    RadioButtonModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
