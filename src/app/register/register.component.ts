
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registrationForm !: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['male', [Validators.required]],
      role: [''],
      isActive: [false] // admin will be responsible for setting this attribute
    });
    /*
    some lesson learnt here, is that you have to enclose the validators within their own array, else we will get some "error"...
    not exactly an error but it tell angular that you will validate/handle the incoming value or data some where else (a server or some function that implements the asyncValidationFn...)
     */
  }

  registerUser() {
    if (this.registrationForm.valid) {
      this.authenticationService.proceedRegisterUser(this.registrationForm.value).subscribe((result) => {
        this.toastr.success("Please contact admin to enable access", "Registered Successfully");
        this.router.navigate(['login']);
      })
    } else {
      this.toastr.warning("Please enter valid data");
    }
  }
}
