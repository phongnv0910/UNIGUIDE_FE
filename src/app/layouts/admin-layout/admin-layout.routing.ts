import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NoteComponent } from '../../pages/note/note.component';
import { NormalFormComponent } from 'src/app/pages/normal-form/normal-form.component';
import { NotificationsComponent } from 'src/app/pages/notifications/notifications.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'note',          component: NoteComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'normal-form',           component: NormalFormComponent },
    { path: 'notifications',          component: NotificationsComponent }
];
