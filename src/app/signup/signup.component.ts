import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm;
  constructor(private _base:BaseService, private router:Router) { }

  ngOnInit() {
     this.signupForm = new FormGroup({
       email : new FormControl(),
       password : new FormControl()
     })

  }
  
  

  createUser()
  {
    //console.log(this.signupForm.value);
    this._base.signup(this.signupForm.value).subscribe(res=>{
      console.log('sdad',res);
      this.router.navigate(['']);

    })
  }
}
