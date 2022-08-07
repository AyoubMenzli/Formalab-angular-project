import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm : FormGroup 

  constructor(
    private fb:FormBuilder,
     private userService:UserService,
      private router:Router,
      private toastr: ToastrService) {
    let FormControls = {
      firstname : new FormControl('',[
        Validators.required,
        Validators.pattern("[a-z .'-]+"),
        Validators.minLength(2)
      ]),
      lastname : new FormControl('',[
        Validators.required,
        Validators.pattern("[a-z .'-]+"),
        Validators.minLength(2)
      ]),
      phone : new FormControl('',[
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.minLength(8),
        Validators.maxLength(13)
      ]),
    }
    this.addUserForm = this.fb.group(FormControls)
   }


   get firstname() {return this.addUserForm.get('firstname')}
   get lastname() {return this.addUserForm.get('lastname')}
   get phone() {return this.addUserForm.get('phone')}


  ngOnInit(): void {
  }


  addUser(){
    let data = this.addUserForm.value;

    /*
    let user = new User(data.firstname,data.lastname,null,data.phone);
    */


    let user = new User(data.firstname,data.lastname,data.phone);
    this.userService.addUser(user).subscribe(
      res=>{
     
        this.toastr.success(res.message);

        this.router.navigate(['/people-list']);

      },
      err => {
        console.log(err);
        
      }
    )
  }

}
