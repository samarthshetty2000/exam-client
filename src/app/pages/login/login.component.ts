import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user = {
    username: '',
    password: '',
  };
  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}
  formSubmit() {
    if (this.user.username == null || this.user.username.trim() == '') {
      this.snack.open('Username is required', '', { duration: 3000 });
      return;
    } else if (this.user.password == null || this.user.password.trim() == '') {
      this.snack.open('Password is required', '', { duration: 3000 });
      return;
    }

    this.userService.loginUser(this.user).subscribe(
      (response: any) => {
        console.log(response);
        this.userService.saveToken(response.token);
       
        

        this.userService.getCurrentUser().subscribe((response) => {
          console.log(response);
          this.userService.setUser(response);
         
          if (this.userService.getUserRole() == 'ADMIN') {
            this.router.navigate(['/admin-dashboard']);
            this.userService.loginStatusSubject.next(true)
          } else if (this.userService.getUserRole() == 'NORMAL'){
            this.router.navigate(['/user-dashboard/0']);
            this.userService.loginStatusSubject.next(true)
          }
          else this.userService.logout();
        });

        // Swal.fire("Success","User Login Sucessfull","success")
      },
      (err) => {
        console.log(err);
        this.snack.open('Invalid credential', '', { duration: 3000 });
      }
    );
  }
  reset() {
    this.user = {
      username: '',

      password: '',
    };
  }
}
