import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  userData !: any;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({});
    this.authenticationService.logOut(); // on component Launch, clear previous user details
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required]]
    })
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.authenticationService.getUserById(this.loginForm.value.username).subscribe((res) => {
        this.userData = res;
        if (this.userData.password == this.loginForm.value.password) {
          if (this.userData.isActive) {
            this.toastr.success("login successful", "User Login");
            sessionStorage.setItem('username', this.userData.id);
            sessionStorage.setItem('userRole', this.userData.role);
            this.router.navigate(['']);
          } else {
            this.toastr.error("please contact admin", 'In-Active User');
          }
        } else {
          this.toastr.error("Invalid credentials");
        }
      });
    } else {
      this.toastr.warning("Please fill in all fields", "User Login");
    }
  }
  /*
  For Dummies 101: Scenario
  the user is attempting to login...
  should be a registered user,
  the logic goes like this...
  user inputs data -> we select one attribute of the data -> get the whole object from the server/database
  select a different attribute from the returned object... -> compare it with the user Input 
  if they match... than we have a validated user... proceed to store token locally, that were returned by server earlier on
  token will be required to do any further communication, especially accessing protected endpoints
  these tokens typically have an expirery date/short life span
   */
}
