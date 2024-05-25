import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { Folder } from 'src/core/models/database/db.model';
import { FileService } from 'src/core/services/file.service';
import { FolderService } from 'src/core/services/folder.service';
import { ObjectType } from 'src/core/ultils/constaints';
import { EmitType } from '@syncfusion/ej2-base';
import { UserLogged } from 'src/core/ultils/userLogged';
import { NgForm } from '@angular/forms';

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
  { id: 2, objectType: ObjectType.folder, path: '/note', title: 'Note', icon: 'ni-tv-2 text-primary', class: 'formz', hasSubmenu: true, parentid: null },
  { id: 4, path: '/maps', title: 'Accomodation', icon: 'ni-pin-3 text-orange', class: 'formz', hasSubmenu: false, parentid: null },
  { id: 5, path: '', title: 'Restaurant', icon: 'ni-single-02 text-yellow', class: 'formz', hasSubmenu: false, parentid: null },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public isExpanded: boolean = false;
  inputFolderName: string = "";
  inputFileName: any = "";
  public menuItems: any[];
  public isCollapsed = true;
  idFolder: any;
  boldIconUp = true;
  showTextBox: boolean = false;
  isExpandChild: boolean = false;
  public listFolders: Folder;
  public checkRequiredRadio: boolean = false;
  public checkNameFolder: boolean = false;
  public checkNameFile: boolean = false;
  public checkToken = false;
  public selectedOption: any;
  public userLogged = new UserLogged();
  public listFile: Array<any> = [];
  @ViewChild('ejDialog') ejDialog: DialogComponent | any;
  @ViewChild('ejDialogFile') ejDialogFile: DialogComponent | any;
  public targetElement?: HTMLElement;

  constructor(private router: Router, private serviceFolder: FolderService, private serviceFile: FileService) { }

  ngOnInit() {
    if (this.userLogged.getToken() === "") {
      this.checkToken = false;
    } else {
      this.checkToken = true;
    }
    this.loadService();
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = false;
    });
  //  console.log(me)
  }

  toggleIconStyle() {
    this.boldIconUp = !this.boldIconUp;
  }

  loadService() {
    this.serviceFolder.getAllFolder().subscribe((data) => {
      this.listFolders = data.data;
      for (let index = 0; index < data.data.length; index++) {
        const folderName = this.listFolders[index].folderName;
        const folder = this.listFolders[index];
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
            icon: 'ni-bullet-list-67',
            class: 'formz fs-10',
            hasSubmenu: false,
            isChildExpand: true,
            parentid: 2,
            isExpanded: false,
            file: folder?.filenotes
          };

          this.menuItems.push(newMenuItem);
          console.log(this.menuItems)
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
    this.clearDialogData();
  }

  submitForm(form: NgForm): void {
    console.log("form", form.value);
  }

  close() {
    this.ejDialog.hide();
    this.ejDialogFile.hide();
    this.clearDialogData();
  }

  toggleSubMenuExpansions(menuItem: any) {
    this.refreshFile();
    this.menuItems.forEach(item => {
      if (item !== menuItem) {
        item.isExpanded = false;
      }
    });

    menuItem.isExpanded = !menuItem.isExpanded;
  }

  getValueCol(value: any) {
    console.log("value in plus", value);
  }

  onInputTextChange(event: any) {
    this.inputFolderName = event.target.value;
  }

  onInputTextChangeFiles(event: any) {
    this.inputFileName = event.target.value;
  }

  onSelectedChange(event: any) {
    this.selectedOption = event.value;
  }

  public onOpenDialog = (event: any): void => {
    this.ejDialog.show();
    this.ejDialog.animationSettings = {
      effect: 'Fade',
      duration: 100,
      delay: 0,
    };
  }

  saveFile() {
    if (this.selectedOption == null) {
      this.checkRequiredRadio = true;
    }
    if (this.inputFileName == "") {
      this.checkNameFile = true;
    }
    debugger
    console.log(this.selectedOption);
    console.log(this.inputFileName);
    if (this.checkNameFile == false && this.checkRequiredRadio == false) {
      let form = {
        fileName: this.inputFileName,
        typeFile: this.selectedOption,
        folderId: this.idFolder
      }

      this.serviceFile.createFile(form).subscribe((data) => {
        this.refreshFile();
        this.clearDialogData();
      });
      this.refreshFile();
      this.ejDialogFile.hide();
      this.clearDialogData();
    }
  }

  refreshFile() {
    if (this.idFolder) {
      this.serviceFile.getFileByIdFolder(this.idFolder).subscribe((data) => {
        // handle response
      })
    }
  }

  save() {
    let formData = {
      folderName: this.inputFolderName
    }
    this.serviceFolder.createFolder(formData).subscribe((data) => {
      this.loadService();
      this.ejDialog.hide();
      this.clearDialogData();
    });
    debugger
    this.loadService();
    this.ejDialog.hide();
    this.clearDialogData();
  }

  onOpenDialogFile = (event: any, value: any): void => {
    this.clearDialogData();
    this.idFolder = value;
    this.ejDialogFile.show();
    this.ejDialogFile.width = '400px';
    this.ejDialogFile.animationSettings = {
      effect: 'Fade',
      duration: 100,
      delay: 0,
    };
  }

  private clearDialogData() {
    this.inputFolderName = "";
    this.inputFileName = "";
    this.selectedOption = "";
  }
}
