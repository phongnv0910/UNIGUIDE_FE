import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from 'src/core/services/file.service';
import { FolderService } from 'src/core/services/folder.service';
import { ObjectType } from 'src/core/ultils/constaints';

// Mở rộng giao diện RouteInfo để hỗ trợ submenu
declare interface RouteInfo {
  id : number;
  objectId? : number;
  objectType? : number;
  path: string;
  title: string;
  icon: string;
  class: string;
  hasSubmenu : boolean;
  parentid : number;
  isExpanded?: boolean;
  isChildExpand?: boolean;
}

export const ROUTES: RouteInfo[] = [
  { id: 2, objectType: ObjectType.folder,path: '/note', title: 'Note',  icon: 'ni-tv-2 text-primary', class: 'formz',hasSubmenu:true, parentid : null},

  
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
  public isExpanded : boolean = false;
  public menuItems: any[];
  public isCollapsed = true;
  boldIconUp = true;
  isExpandChild : boolean = false;
  public listFolders : Array<any> = [];
  public listFile : Array<any>=[];
  constructor(private router: Router,
  private serviceFolder : FolderService,
  private serviceFile : FileService 
  ) { }

  ngOnInit() {
    this.loadService();
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = false;
   });
  }
  toggleIconStyle() {
    this.boldIconUp = !this.boldIconUp;
  }
  loadService(){
    this.serviceFolder.getAllFolder().subscribe((data) => {
      this.listFolders = data.data;
      for (let index = 0; index < this.listFolders.length; index++) {
        const folderName = this.listFolders[index].folderName;
      
        const menuItem = this.menuItems.find(item => item.path === '/' + folderName);
        if (menuItem) {
          menuItem.folderName = folderName; 
        } else {
          const newMenuItem: RouteInfo = {
            id: this.menuItems.length + 100, 
            objectType: null,
            objectId: this.listFolders[index].folderId,
            path: '/' + folderName, 
            title: folderName, 
            icon: 'ni-collection', 
            class: 'formz', 
            hasSubmenu: false, 
            isChildExpand : true,
            parentid: 2 
          };
          this.menuItems.push(newMenuItem); 
        }
      }
    });
  }
  onChange(value : any){
    console.log("vbalue neee",value)
  }
  
  toggleMenuExpansion() {
     this.isExpanded = !this.isExpanded;
  }
  
  toggleSubMenuExpansions(menuItem: any) {
  this.serviceFile.getFileByIdFolder(menuItem.objectId).subscribe((data) =>{
    this.listFile = data.data;
  })
   console.log("menuItem",menuItem)
    this.menuItems.forEach(item => {
      if (item !== menuItem) {
        item.isExpanded = false;
      }
    });
    
    menuItem.isExpanded = !menuItem.isExpanded;

  }
  
  
}
