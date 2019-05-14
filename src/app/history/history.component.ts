import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base.service';
import { MatDialogConfig, MatSnackBar, MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  width = '600px';
  height1 = '600px';
  month = new Array();

  constructor(private formBuilder: FormBuilder, private router: Router, private _base: BaseService, public snackBar: MatSnackBar, public modalService: MatDialog) {}
  taskHistory=[];
  ngOnInit() {
    this.month[0] = "January";
this.month[1] = "February";
this.month[2] = "March";
this.month[3] = "April";
this.month[4] = "May";
this.month[5] = "June";
this.month[6] = "July";
this.month[7] = "August";
this.month[8] = "September";
this.month[9] = "October";
this.month[10] = "November";
this.month[11] = "December";
    this.getTaskHistory();

  }

  getTaskHistory()
  {
    this._base.getTaskStatus().subscribe(res=>{
      this.taskHistory = res.data;
      this.taskHistory = this.taskHistory.map(elem=>{
         let date = new Date(elem.date);
         let currentDate = date.getDate()+' '+(this.month[date.getMonth()+1])+' '+date.getFullYear();
         return {
           ...elem,
           date:currentDate
         };
      })
      console.log(this.taskHistory);
    })
  }

  Cross_click() {
    this.modalService.closeAll();
  }

  showTask(content,i) {
    const dialogConfig = new MatDialogConfig();
    this.modalService.open(content, {
      height: this.height1,
      width: this.width,
      panelClass: 'custom-modalbox'
    });


  }

}
