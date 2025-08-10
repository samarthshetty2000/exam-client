import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any=null
  role:any
  constructor(private userService:UserService) { }



  ngOnInit(): void {
    
   this.user= this.userService.getUser()
   this.role=this.userService.getUserRole()
  }

}
