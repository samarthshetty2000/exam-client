import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public loginStatusSubject=new Subject<boolean>()

  addUser(user: any) {
    return this.http.post(`${baseUrl}/user/`, user);
  } 




  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`)
  }

  loginUser(user: { username: string; password: string }) {
    console.log("user")
    return this.http.post(`${baseUrl}/generate-token`, user);
  }

  public saveToken(data:any){

    localStorage.setItem("token",data)
    return true;
  }

  public isLoggedIn(){
    let token=localStorage.getItem("token")
    if(token==undefined || token=="" || token ==null){
      return false
    }
    return  true;

  }


  public logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    return true
  }


  public getToken(){
    return localStorage.getItem("token")
  }

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user))
  }

  public getUser(){
   let userStr=localStorage.getItem("user")
   if(userStr!=null){
    return JSON.parse(userStr)
   }
   else{
    this.logout()
    return null
   }
  }



  public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority
  }
}
