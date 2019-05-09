import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BaseService } from '../services/base.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm
  constructor(private router:Router, private _base:BaseService, public snackBar : MatSnackBar) { }

  ngOnInit() {
    // document.getElementById('login-button').addEventListener('click',function(event){
    //   event.preventDefault();
    // document.getElementById('wrapper').classList.add('form-success');
    // const fade = document.getElementsByTagName('form');     
//})
this.loginForm = new FormGroup({
    email : new FormControl(),
    password : new FormControl()
})

}
login() {
  this._base.login(this.loginForm.value).subscribe(result => {
    console.log(result);
    this._base.isAuthenticated = true;
    if (result.isAuthenticated) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', this.loginForm.value.email);
      this.router.navigate(['home']);
    } else {
      console.log('not authenticated');
      this.snackBar.open(result.message, '', {
        duration: 3000
      });
    }
  })
}
}
