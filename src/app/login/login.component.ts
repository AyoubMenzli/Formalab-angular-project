import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup 

  constructor(private fb:FormBuilder,
    private userService:UserService,
    private router:Router,
    private toastr: ToastrService
    ) {
    let FormControls = {
      email : new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password : new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),
    }
    this.loginForm = this.fb.group(FormControls)
   }


   get email() {return this.loginForm.get('email')}
   get password() {return this.loginForm.get('password')}


  ngOnInit(): void {
    let isLoggedIn = this.userService.isLoggedIn();
    if (isLoggedIn) {
     this.router.navigate(['/people-list']);
     
    } 
  }


  login(){
    let data = this.loginForm.value;

    let user = new User(undefined,undefined,data.email,undefined,data.password);

    this.userService.loginAdmin(user).subscribe(
      res=>{

       let token = res.token;
       localStorage.setItem("myToken",token);
       this.router.navigate(['/people-list']);


      },
      err=>{
        console.log(err);
        
      }

    )
    
    
  }

}
