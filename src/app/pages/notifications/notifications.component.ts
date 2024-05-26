import { Component, OnInit } from '@angular/core';
import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NotificationsService } from 'src/core/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  public toolbarOptions: ToolbarItems[];

  public editSettings?: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    //template: false,
     mode: 'Dialog',
  };
  categoryData: Object[] = [
    {

        "CategoryName": "PRN221",
        'ProductID': 1,
        'ProductName': 'Chúng tôi vừa nhận được điểm progress test môn PRN221 của bạn. Để có thể cải thiện được kiến thức về môn học này, chúng tôi sẽ cung cấp thêm cho bạn một số tài liệu để giúp bạn nắm bắt được trong việc sử dụng ngôn ngữ C#: Tài liệu 1, Tài liệu 2',
        'SupplierID': 1,
        'QuantityPerUnit': '30/10/2024',
        // 'UnitPrice': 18.00,
        // 'UnitsInStock': 39,
        'Discontinued': true
    },

    {

      "CategoryName": "Tư vấn chọn chuyên ngành hẹp",
      'ProductID': 1,
      'ProductName': 'Chúng tôi đã nhận được toàn bộ số điểm của bạn trong 4 kỳ học vừa qua và nhận thấy rằng bạn có thế mạnh trong việc trong các môn học về kiến trúc dữ liệu và giải thuật vì vậy bạn có thể chọn chuyên ngành hẹp của mình hướng về Backend WEB cụ thể là .net',
      'SupplierID': 1,
      'QuantityPerUnit': '30/10/2024',
      // 'UnitPrice': 18.00,
      // 'UnitsInStock': 39,
      'Discontinued': true
  },
//   {

//     "CategoryName": "Do task 3",
//     'ProductID': 1,
//     'ProductName': 'Da Hue',
//     'SupplierID': 1,
//     'QuantityPerUnit': '30/10/2024',
//     // 'UnitPrice': 18.00,
//     // 'UnitsInStock': 39,
//     'Discontinued': true
// },

// {

//   "CategoryName": "Do task 4",
//   'ProductID': 1,
//   'ProductName': 'Tuan Vu',
//   'SupplierID': 1,
//   'QuantityPerUnit': '30/10/2024',
//   // 'UnitPrice': 18.00,
//   // 'UnitsInStock': 39,
//   'Discontinued': true
// },

// {

//   "CategoryName": "Do task 5",
//   'ProductID': 1,
//   'ProductName': 'Dam Vinh Hung',
//   'SupplierID': 1,
//   'QuantityPerUnit': '30/10/2024',
//   // 'UnitPrice': 18.00,
//   // 'UnitsInStock': 39,
//   'Discontinued': true
// },
// {

//   "CategoryName": "Do task 1",
//   'ProductID': 1,
//   'ProductName': 'Quang Le',
//   'SupplierID': 1,
//   'QuantityPerUnit': '30/10/2024',
//   // 'UnitPrice': 18.00,
//   // 'UnitsInStock': 39,
//   'Discontinued': true
// },

// {

//   "CategoryName": "Do task 1",
//   'ProductID': 1,
//   'ProductName': 'Truong my lan',
//   'SupplierID': 1,
//   'QuantityPerUnit': '30/10/2024',
//   // 'UnitPrice': 18.00,
//   // 'UnitsInStock': 39,
//   'Discontinued': true
// },

// {

//   "CategoryName": "Do task 1",
//   'ProductID': 1,
//   'ProductName': 'Bui Xuan Huan',
//   'SupplierID': 1,
//   'QuantityPerUnit': '30/10/2024',
//   // 'UnitPrice': 18.00,
//   // 'UnitsInStock': 39,
//   'Discontinued': true
// },

// {

//   "CategoryName": "Do task 1",
//   'ProductID': 1,
//   'ProductName': 'Qua Te',
//   'SupplierID': 1,
//   'QuantityPerUnit': '30/10/2024',
//   // 'UnitPrice': 18.00,
//   // 'UnitsInStock': 39,
//   'Discontinued': true
//}
,];

  public data?: object[];
  public listNotification?: Array<any> =[];
  ngOnInit(): void {
    this.toolbarOptions = ['Add', 'Edit', 'Delete'];
   this.getNotifi();
  }
  constructor(private readonly service : NotificationsService){}

  getNotifi(){
    this.service.getNotifications().subscribe((data)=>{
      this.listNotification = data.data;

    })
  }
}

