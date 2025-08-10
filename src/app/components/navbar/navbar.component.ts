import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn=false;
  user:any=null

  constructor(public userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn=this.userService.isLoggedIn()
      this.user=this.userService.getUser(); 
    this.userService.loginStatusSubject.asObservable().subscribe(data=>{

      console.log("Nav bar triggered")
      this.isLoggedIn=this.userService.isLoggedIn()
      this.user=this.userService.getUser(); 
    })
  }

  logout(){
  
    this.userService.logout();
    this.userService.loginStatusSubject.next(false)

 this.router.navigate(["/login"])

   
  }

  
}
