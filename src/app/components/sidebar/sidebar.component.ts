import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Mở rộng giao diện RouteInfo để hỗ trợ submenu
declare interface RouteInfo {
  id : number;
  path: string;
  title: string;
  icon: string;
  class: string;
  hasSubmenu : boolean;
  parentid : number;
  isExpanded?: boolean;
}

export const ROUTES: RouteInfo[] = [
  { id :2,path: '', title: 'Note',  icon: 'ni-tv-2 text-primary', class: 'formz',hasSubmenu:true, parentid : null},
  { id: 3, path: '/icons', title: 'Club ',  icon:'ni-planet text-blue', class: 'formz' ,hasSubmenu:false, parentid : 2},
  { id: 4, path: '/maps', title: 'Accomodation',  icon:'ni-pin-3 text-orange', class: 'formz' ,hasSubmenu:false, parentid : null},
  { id: 5, path: '', title: 'Restaurant',  icon:'ni-single-02 text-yellow', class: 'formz' ,hasSubmenu:false, parentid : null},
//   { id: 6,path: '', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' ,hasSubmenu:true, parentid : 5},
//   { id: 7,path: '', title: 'Login',  icon:'ni-key-25 text-info', class: '', hasSubmenu:true, parentid : null},
//   { id: 8,path: '', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' ,hasSubmenu:true, parentid : 5},
// ];
// export const ROUTES: Menu[] = [
//   { id: 1, title: 'Note', routerLink: null, href: null, icon: 'th-list', target: null, hasSubMenu: true, parentId: 0, roles: null, routeKey: 'danhmuc' },
//   { id: 10, title: 'Dashboard', routerLink: '/dardshboa', href: null, icon: 'building', target: null, hasSubMenu: false, parentId: 1, routeKey: 'dashboard' },
 ]

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  boldIconUp = true;
  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = false;
   });
  }
  toggleIconStyle() {
    this.boldIconUp = !this.boldIconUp;
  }
  toggleMenuExpansion(menuItem: RouteInfo) {
    menuItem.isExpanded = !menuItem.isExpanded;
  }
  
  
}
