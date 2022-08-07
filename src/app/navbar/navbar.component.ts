import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  imageUrl = "assets/images/formalab.png";

  isLoggedIn ?: Boolean ;

  constructor(private userService:UserService, private router:Router ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
  }


  logout(){
    localStorage.removeItem("mytoken");
    this.router.navigate(['/login']);
  }

}
