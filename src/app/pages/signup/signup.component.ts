import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public user={
    username:"",
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    password:""
  }

  constructor(private userService:UserService,private snack:MatSnackBar) { }

  ngOnInit(): void {
  }
  formSubmit(){
    if(this.user.username==null||this.user.username=="" ){
      this.snack.open("Username is required",'',{duration:3000})
    return
    }
    this.userService.addUser(this.user).subscribe((response)=>{
      console.log(response)
      Swal.fire("Success","user is Resistered","success")
    },(err)=>{
      console.log("Error")
      this.snack.open("Something went wrong",'',{duration:3000})
    })
  

  }
  reset(){
    this.user={
      username:"",
      firstName:"",
      lastName:"",
      email:"",
      phone:"",
      password:""
    }
  }

}
