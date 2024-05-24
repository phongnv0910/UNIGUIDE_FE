import { Component, OnInit, OnDestroy,ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { EmailValidators } from 'ngx-validators';
import { ToastComponent } from '@syncfusion/ej2-angular-notifications';
import { LoginService } from 'src/core/services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { HostelService } from 'src/core/services/hostel.service';
import { HttpClient } from '@angular/common/http';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
@Component({
    selector: 'app-hostel',
    templateUrl: './hostel.component.html',
    styleUrls: ['./hostel.component.scss']
})
export class HostelComponent implements OnInit {
    @ViewChild('ejDialog') ejDialog: DialogComponent | any;
    // Create element reference for dialog target element.
    @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef | any;
    // The Dialog shows within the target element.
    public hideDialog: EmitType<object> = () => {
      this.ejDialog.hide();
    };
  
    public initilaizeTarget: EmitType<object> = () => {
      this.targetElement = this.container.nativeElement.parentElement;
    };
    public targetElement?: HTMLElement;
    hostels: any[] = [];

    constructor(private http: HttpClient, private hostelService: HostelService) { }

    ngOnInit(): void {
        this.fetchHostels();
    }

    fetchHostels(): void {
        const params = {
            ownerName: "string",
            phoneNumber: "string",
            address: "string",
            googleMapAddress: "string",
            existenceTime: "2024-05-23T06:55:13.221Z"
        };
    
        this.hostelService.getList(params).subscribe(
            (response) => {
                if (response.statusCode === 200 && response.data) {
                    this.hostels = response.data;
                } else {
                    console.error('Failed to fetch hostels:', response.message);
                }
            },
            (error) => {
                console.error('HTTP error:', error);
            }
        );
    }
    public onOpenDialog = (event: any): void => {
        this.ejDialog.show();
    };
    close(){
      this.ejDialog.hide();
    }
}