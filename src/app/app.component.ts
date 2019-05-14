import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Daily Goals';
  date:any;
  ngOnInit()
  {
    let today = new Date();
    this.date = (today.getUTCMonth()+1)+'/'+today.getUTCDate()+'/'+today.getUTCFullYear();

    

    console.log(this.date);
    localStorage.setItem('todayDate',JSON.stringify(this.date));
    
  }


}
