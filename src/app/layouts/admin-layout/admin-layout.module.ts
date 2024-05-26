import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NormalFormComponent } from 'src/app/pages/normal-form/normal-form.component';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { NotificationsComponent } from 'src/app/pages/notifications/notifications.component';
import { FormViproComponent } from 'src/app/pages/form-vipro/form-vipro.component';
import { ClubComponent } from 'src/app/pages/club/club.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    DialogModule,
    ClipboardModule,
    GridAllModule,
    TextBoxAllModule,
    DatePickerAllModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    NormalFormComponent,
    NotificationsComponent,
    FormViproComponent,
    ClubComponent,
  ]
})

export class AdminLayoutModule {}
