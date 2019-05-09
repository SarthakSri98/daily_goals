import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  date:any;
  // indeterminate = false;
  labelPosition = 'after';
  constructor() { }
  taskForm :FormBuilder
  tasks=['kutta tehlao','pani dalo'];
  ngOnInit() {
    let today = new Date();
    this.date = today.getDate()+' / '+(today.getMonth()+1)+' / '+today.getFullYear();
    console.log(this.date);

    
  }

}
