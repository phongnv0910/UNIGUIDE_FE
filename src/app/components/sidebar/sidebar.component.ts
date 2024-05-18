import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { Folder } from 'src/core/models/database/db.model';
import { FileService } from 'src/core/services/file.service';
import { FolderService } from 'src/core/services/folder.service';
import { ObjectType } from 'src/core/ultils/constaints';
import { EmitType } from '@syncfusion/ej2-base';
// Mở rộng giao diện RouteInfo để hỗ trợ submenu
declare interface RouteInfo {
  id: number;
  objectId?: number;
  objectType?: number;
  path: string;
  title: string;
  icon: string;
  class: string;
  hasSubmenu: boolean;
  parentid: number;
  isExpanded?: boolean;
  isChildExpand?: boolean;
  file?: Array<any>;
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
  inputFolderName : any;
  public menuItems: any[];
  public isCollapsed = true;
  boldIconUp = true;
  showTextBox: boolean = false;
  isExpandChild : boolean = false;
  public listFolders : Folder;
  public listFile : Array<any>=[];
   @ViewChild('ejDialog') ejDialog: DialogComponent | any;
  // @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef | any;
  public targetElement?: HTMLElement;
  constructor(private router: Router,
  private serviceFolder : FolderService,
  private serviceFile : FileService 
  ) { }

  ngOnInit() {
   // this.initilaizeTarget();
    this.loadService();
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = false;
   });
  }
  // public initilaizeTarget: EmitType<object> = () => {
  //   this.targetElement = this.container.nativeElement.parentElement;
  // }
  toggleIconStyle() {
    this.boldIconUp = !this.boldIconUp;
  }
  loadService(){
    this.serviceFolder.getAllFolder().subscribe((data) => {
      this.listFolders = data.data;
      for (let index = 0; index < data.data.length; index++) {
        const folderName = this.listFolders[index].folderName;
        const folder = this.listFolders[index];
        console.log(folder.filenotes)
        const menuItem = this.menuItems.find(item => item.path === '/' + folderName);
        if (menuItem) {
          menuItem.folderName = folderName; 
        } else {
          const newMenuItem: RouteInfo = {
            id: this.menuItems.length + 100,
  objectType: null,
  objectId: this.listFolders[index]?.folderId, 
  path: '/' + folderName,
  title: folderName,
  icon: 'ni-collection',
  class: 'formz fs-10',
  hasSubmenu: false,
  isChildExpand: true,
  parentid: 2,
  isExpanded: false, 
  file: folder?.filenotes
          };
          
          this.menuItems.push(newMenuItem); 
          console.log("newMenuItem",newMenuItem)
        }
      }
    });
  }

  toggleTextBox() {
    this.showTextBox = !this.showTextBox;
  }
  toggleMenuExpansion() {
     this.isExpanded = !this.isExpanded;
  }
  public onOverlayClick: EmitType<object> = () => {
    this.ejDialog.hide();
}
close(){
  this.ejDialog.hide();
}
  toggleSubMenuExpansions(menuItem: any) {
   console.log("menuItem",menuItem)
    this.menuItems.forEach(item => {
      if (item !== menuItem) {
        item.isExpanded = false;
      }
    });
    
    menuItem.isExpanded = !menuItem.isExpanded;

  }
  onInputTextChange(event: any) {
   this.inputFolderName = event.target.value;
  }
  public onOpenDialog = (event: any): void => {
    this.ejDialog.show();
    this.ejDialog.animationSettings = {
      effect: 'Fade',
      duration: 100,
      delay: 0,
    };
};
save(){
console.log("event",this.inputFolderName);
let formData =  {
  folderName : this.inputFolderName
}
this.serviceFolder.createFolder(formData).subscribe((data) => {
  console.log(data);
  this.loadService();
  this.ejDialog.hide();
  this.inputFolderName = "";
})
}
}
