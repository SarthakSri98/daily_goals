import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray
} from '@angular/forms';
import {
  MatDialog,
  MatSnackBar,
  MatDialogConfig
} from '@angular/material';
import {
  Router
} from '@angular/router';
import {
  BaseService
} from '../services/base.service';
import {
  componentHostSyntheticProperty
} from '@angular/core/src/render3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  date: any;
  taskForm;
  taskArray = [];
  month = new Array();
  taskStatusArray: boolean[] = [];
  width = '600px';
  height1 = '600px';
  taskData: FormArray;
  labelPosition = 'after';
  token;
  counter: number = 0;
  constructor(private formBuilder: FormBuilder, private router: Router, private _base: BaseService, public snackBar: MatSnackBar, public modalService: MatDialog) {}

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
   
    this.getTasks();
    if (localStorage.getItem('taskStatusArray')) {
      this.taskStatusArray = JSON.parse(localStorage.getItem('taskStatusArray'));
    }

    this.token = (localStorage.getItem('token'));

    let currentDate = new Date();
    this.date = currentDate.getUTCDate() + ' ' + (this.month[currentDate.getMonth()]) + ' ' + currentDate.getFullYear();

    console.log(this.date);

    this.taskForm = new FormGroup({
      taskData: this.formBuilder.array([this.createItem()]),
      token: new FormControl(this.token),
      _id: new FormControl(''),
    })

   
    console.log(this.taskForm.get('taskData').controls);
    this.removeEmpty();
  }

 


  removeEmpty() {
    console.log('empty tasks removed');
    console.log('controls', this.taskForm.get('taskData').controls.length);

    let i: any = 0;
    console.log(i);
    while (i < this.taskForm.get('taskData').controls.length) {
      if (this.taskForm.get('taskData').controls[i].value.taskName == '' || this.taskForm.get('taskData').controls[i].value.taskName == null) {
        this.taskForm.get('taskData').controls.shift();
        console.log('if');
      } else {
        break;
        console.log('else');
      }
      i++;
    }
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      taskName: '',
      priority: ''
    });
  }



  showCreatedItem(task, priority): FormGroup {
    return this.formBuilder.group({
      taskName: task,
      priority: priority
    });
  }

  addItem() {
    this.taskData = this.taskForm.get('taskData') as FormArray;
    this.taskData.push(this.createItem());
    console.log(this.taskForm.get('taskData').controls);
  }

  addCreatedItem(task, priority) {
    this.taskData = this.taskForm.get('taskData') as FormArray;
    this.taskData.push(this.showCreatedItem(task, priority));
  }

  checkedIn(event, i) {
    console.log(event.checked);
    this.taskStatusArray[i] = event.checked;
    localStorage.removeItem('taskStatusArray');
    localStorage.setItem('taskStatusArray', JSON.stringify(this.taskStatusArray));
  }

  getTasks() {

    this._base.getTasks().subscribe(res => {
      console.log(res.result[0]);
      if (res.result[0]) {
        this.taskArray = res.result[0].taskData;
        localStorage.setItem('currentId', JSON.stringify(res.result[0]._id));
        localStorage.setItem('taskArray',JSON.stringify(this.taskArray));
        this.makeStatusArray();
        console.log('getres', res.result[0]._id);
      }
      // this.counter = this.taskArray.length; 
      console.log('1', this.taskArray);
      this.taskArray.sort((a: any, b: any): number => {
        if (a.priority > b.priority) {
          return -1;
        } else if (a.priority < b.priority) {
          return 1;
        } else {
          return 0;
        }
      });
      console.log('2', this.taskArray);

      console.log((localStorage.getItem('taskStatusArray')));
      if (!JSON.parse(localStorage.getItem('taskStatusArray'))) {
        localStorage.setItem('taskStatusArray', JSON.stringify(this.taskStatusArray));
      }
      console.log(this.taskStatusArray);
    });
  }


  makeStatusArray() {
    if (this.counter == 0) {
      if (JSON.parse(localStorage.getItem('taskStatusArray'))) {
        this.taskStatusArray = JSON.parse(localStorage.getItem('taskStatusArray'));
      }
      console.log(this.taskArray);
      for (let i = 0; i < this.taskArray.length; i++) {
        if (this.taskStatusArray.length <= i)
          this.taskStatusArray.push(false);
        this.addCreatedItem(this.taskArray[i].taskName, this.taskArray[i].priority);
        this.removeEmpty();
      }
      localStorage.setItem('taskStatusArray', JSON.stringify(this.taskStatusArray));

    }
    this.counter = 1;
  }



  addNewTask(content) {
    this.getTasks();
    const dialogConfig = new MatDialogConfig();
    this.modalService.open(content, {
      height: this.height1,
      width: this.width,
      panelClass: 'custom-modalbox'
    });
    this.removeEmpty();


  }

  addTasks() {
    // if(this.taskArray.length>0)
    // this.deleteTasks();
    this.taskForm.value._id = JSON.parse(localStorage.getItem('currentId'));
    console.log(this.taskForm.value);
    // this.taskForm.value.token = this.token;
    console.log('token', this.token);
    this.taskForm.value.token = this.token;
    this._base.postTasks(this.taskForm.value).subscribe(res => {
      console.log('postres', res);
      this.getTasks();
    })
    console.log(this.taskForm.value);
    this.taskForm.reset();
    this.Cross_click();
    // this.getTasks();
    this.snackBar.open('The new Topic has been created!', '', {
      duration: 3000
    });
    console.log('created');
  }

  editTasks() {
    // if(this.taskArray.length>0)
    // this.deleteTasks();
    this.taskForm.value._id = JSON.parse(localStorage.getItem('currentId'));
    console.log(this.taskForm.value);
    // this.taskForm.value.token = this.token;
    console.log('token', this.token);
    this.taskForm.value.token = this.token;
    this._base.editTasks(this.taskForm.value).subscribe(res => {
      console.log('postres', res);
      this.getTasks();
    })
    console.log(this.taskForm.value);
    this.taskForm.reset();
    this.Cross_click();
    // this.getTasks();
    this.snackBar.open('The new Topic has been created!', '', {
      duration: 3000
    });
    console.log('updated');
    this.counter = 0;

  }

  postOrEditTasks() {
    console.log('id is', this.taskArray.length > 0);
    if (this.taskArray.length > 0)
      this.editTasks();
    else
      this.addTasks();
  }

  Cross_click() {
    this.modalService.closeAll();
  }




  delete(i) {
    this.taskForm.get('taskData').controls.splice(i, 1);
    this.taskForm.value.taskData.splice(i, 1);
    this.taskStatusArray.splice(i, 1);
    localStorage.setItem('taskStatusArray', JSON.stringify(this.taskStatusArray));

  }

  deleteTasks() {
    this._base.deleteTasks().subscribe(res => {
      // console.log(res);
    })
  }

}