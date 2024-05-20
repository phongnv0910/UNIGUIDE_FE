import { Component, OnInit } from '@angular/core';
import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-form-vipro',
  templateUrl: './form-vipro.component.html',
  styleUrls: ['./form-vipro.component.scss']
})
export class FormViproComponent implements OnInit {
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
      
        "CategoryName": "10",
        'ProductID': 9,
        'ProductName': '6',
        'SupplierID': 1,
        'QuantityPerUnit': '30/10/2024',
        // 'UnitPrice': 18.00,
        // 'UnitsInStock': 39,
        'Discontinued': true
    },
  ];
  tailieu: Object[] = [
    {
      
        "DocumentName": " Windows Presentation Foundation (WPF).ts",
        'Title': "Lịch sử và phát triển của Windows Presentation Foundation (WPF).",
        
    },
    {
      
      "DocumentName": "XAML.xml",
      'Title': "Cú pháp cơ bản của XAML và các phần tử cơ bản như Window, Button, TextBox.",
      
  },
  ];
  constructor() { }
  public data?: object[];
  public data1?: object[];
  ngOnInit(): void {
    this.toolbarOptions = ['Add', 'Edit', 'Delete'];
      this.data = this.categoryData;
      this.data1 = this.tailieu;
  }
}
