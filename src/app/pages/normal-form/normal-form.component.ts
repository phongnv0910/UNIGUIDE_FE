import { Component, OnInit } from '@angular/core';
import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-normal-form',
  templateUrl: './normal-form.component.html',
  styleUrls: ['./normal-form.component.scss']
})

export class NormalFormComponent implements OnInit {
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
      
        "CategoryName": "Do task 1",
        'ProductID': 1,
        'ProductName': 'Quang Ha',
        'SupplierID': 1,
        'QuantityPerUnit': '30/10/2024',
        // 'UnitPrice': 18.00,
        // 'UnitsInStock': 39,
        'Discontinued': true
    },

    {
      
      "CategoryName": "Do task 2",
      'ProductID': 1,
      'ProductName': 'Quang Lap',
      'SupplierID': 1,
      'QuantityPerUnit': '30/10/2024',
      // 'UnitPrice': 18.00,
      // 'UnitsInStock': 39,
      'Discontinued': true
  },
  {
      
    "CategoryName": "Do task 3",
    'ProductID': 1,
    'ProductName': 'Da Hue',
    'SupplierID': 1,
    'QuantityPerUnit': '30/10/2024',
    // 'UnitPrice': 18.00,
    // 'UnitsInStock': 39,
    'Discontinued': true
},

{
      
  "CategoryName": "Do task 4",
  'ProductID': 1,
  'ProductName': 'Tuan Vu',
  'SupplierID': 1,
  'QuantityPerUnit': '30/10/2024',
  // 'UnitPrice': 18.00,
  // 'UnitsInStock': 39,
  'Discontinued': true
},

{
      
  "CategoryName": "Do task 5",
  'ProductID': 1,
  'ProductName': 'Dam Vinh Hung',
  'SupplierID': 1,
  'QuantityPerUnit': '30/10/2024',
  // 'UnitPrice': 18.00,
  // 'UnitsInStock': 39,
  'Discontinued': true
},
{
      
  "CategoryName": "Do task 1",
  'ProductID': 1,
  'ProductName': 'Quang Le',
  'SupplierID': 1,
  'QuantityPerUnit': '30/10/2024',
  // 'UnitPrice': 18.00,
  // 'UnitsInStock': 39,
  'Discontinued': true
},

{
      
  "CategoryName": "Do task 1",
  'ProductID': 1,
  'ProductName': 'Truong my lan',
  'SupplierID': 1,
  'QuantityPerUnit': '30/10/2024',
  // 'UnitPrice': 18.00,
  // 'UnitsInStock': 39,
  'Discontinued': true
},

{
      
  "CategoryName": "Do task 1",
  'ProductID': 1,
  'ProductName': 'Bui Xuan Huan',
  'SupplierID': 1,
  'QuantityPerUnit': '30/10/2024',
  // 'UnitPrice': 18.00,
  // 'UnitsInStock': 39,
  'Discontinued': true
},

{
      
  "CategoryName": "Do task 1",
  'ProductID': 1,
  'ProductName': 'Qua Te',
  'SupplierID': 1,
  'QuantityPerUnit': '30/10/2024',
  // 'UnitPrice': 18.00,
  // 'UnitsInStock': 39,
  'Discontinued': true
},];
    
  public data?: object[];

  ngOnInit(): void {
    this.toolbarOptions = ['Add', 'Edit', 'Delete'];
      this.data = this.categoryData;
  }
}