import { Component, OnInit, OnDestroy,ViewEncapsulation, ViewChild } from '@angular/core';
import { EmailValidators } from 'ngx-validators';
import { ToastComponent } from '@syncfusion/ej2-angular-notifications';
import { LoginService } from 'src/core/services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { HostelService } from 'src/core/services/hostel.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-hostel',
    templateUrl: './hostel.component.html',
    styleUrls: ['./hostel.component.scss']
})
export class HostelComponent implements OnInit {
    targetElement: HTMLElement;
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
}