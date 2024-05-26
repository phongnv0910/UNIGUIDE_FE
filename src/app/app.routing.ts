import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NoteComponent } from './pages/note/note.component';
import { NotFoundError } from 'rxjs';
import { NormalFormComponent } from './pages/normal-form/normal-form.component';

const routes: Routes =[
  {
   path: '',
   redirectTo: 'dashboard',
   pathMatch: 'full',
 },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  }, {
    path: 'hi',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  },
  //{ path: '**', component: NormalFormComponent },
  //  {
  //   path: '**',
  //   redirectTo: ''
  // },
  // {
  //   path: 'normal-form',
  //   loadChildren: () =>
  //     import('src/app/pages/normal-form/normal-form.module').then((m) => m.NormalFormModule),
  //   data: {
  //     breadcrumb: 'Normal Form',
  //     // routeKey: 'danhmuc',
     
  //   },
  // },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
export { routes };