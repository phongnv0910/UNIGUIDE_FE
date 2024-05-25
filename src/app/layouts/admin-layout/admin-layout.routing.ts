import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NoteComponent } from '../../pages/note/note.component';
import { NormalFormComponent } from 'src/app/pages/normal-form/normal-form.component';
import { NotificationsComponent } from 'src/app/pages/notifications/notifications.component';
import { FormViproComponent } from 'src/app/pages/form-vipro/form-vipro.component';
import { ClubComponent } from 'src/app/pages/club/club.component';
import { HostelComponent } from 'src/app/pages/hostel/hostel.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'note/:noteId',   component: NoteComponent },
    { path: 'normal-form/:formId', component: NormalFormComponent },  // Corrected to accept an ID parameter
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'form-vipro',     component: FormViproComponent },
    { path: 'club',           component: ClubComponent },
    { path: 'hostel',         component: HostelComponent },
];
