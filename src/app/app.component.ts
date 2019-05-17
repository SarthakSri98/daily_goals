import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from './services/base.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import schedule from 'node-schedule'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Daily Goals';
  date:any;
  taskStatusArray:any=[];
  taskArray:any=[];
  token;
  taskStatusForm : FormGroup;
  postFlag: Boolean=false;

  constructor(private formBuilder: FormBuilder, private router: Router, private _base: BaseService, public snackBar: MatSnackBar, public modalService: MatDialog) 
  {}
  ngOnInit()
  {
    schedule.scheduleJob('30 8 * * *', () => {
      console.log('efef1');
      this.postTaskStatus();
    })

    for (let i = 0; i < 23; i++) {
      schedule.scheduleJob('30 ' + i + ' * * *', () => {
        console.log('efef1', i);
        // this.postTaskStatus();
      })
    }

    this.taskArray = JSON.parse(localStorage.getItem('taskArray'));
    let today = new Date();
    this.date = (today.getUTCMonth()+1)+'/'+(today.getUTCDate()-1)+'/'+today.getUTCFullYear();
    this.token = (localStorage.getItem('token'));

    

    console.log(this.date);
    localStorage.setItem('todayDate',JSON.stringify(this.date));
    this.taskStatusForm = new FormGroup({
      date: new FormControl(this.date),
      tasksStatusData: this.formBuilder.array([this.taskStatusData()]),
      // taskStatus: this.formBuilder.array([]),
      token: new FormControl(this.token),

    })
    
  }

  taskStatusData(): FormGroup {
    return this.formBuilder.group({
      task: '',
      taskStatus: ''
    });
  }

   postTaskStatus() {
    if (!JSON.parse(localStorage.getItem('postFlag'))) {
      this.taskStatusArray = JSON.parse(localStorage.getItem('taskStatusArray'));
      for (let i = 0; i < this.taskArray.length; i++) {
        this.taskStatusForm.value.tasksStatusData[i] = {
          task: this.taskArray[i].taskName,
          taskStatus: this.taskStatusArray[i]
        }
      }
      localStorage.setItem('taskStatusArray', JSON.stringify(this.taskStatusArray));
      console.log(this.taskStatusForm.value);
      this._base.postTaskStatus(this.taskStatusForm.value).subscribe(res => {
        // console.log(res);
        localStorage.setItem('postFLag', JSON.stringify(true));
      })
    }
  }

}
