import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { LoginRequest } from 'src/app/interface/login.interface';
import { LoginService } from '../../service/login.service';
import { TokenResponse } from '../../interface/TokenResponse.interface';
import { TokenService } from '../../service/token.service';
import { Router } from '@angular/router';
import { ErrorResponse } from 'src/app/interface/ErrorResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  loginRequest: LoginRequest = {
    UserName: "",
    Password: ""
  };
  TokenResponse: TokenResponse = {token : ''} ;

  isLoggedIn = false;
  isLoginFailed = false;
  //error: ErrorResponse = { error: '', errorCode:''};
  error!: HttpErrorResponse;

  constructor(private LoginService:LoginService,private TokenService:TokenService,private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required,Validators.minLength(6)]),
      password: new FormControl(null,[Validators.required, Validators.minLength(4)])
     });
     }


  ngOnInit(): void {
    let isLoggedIn = this.TokenService.isLoggedIn();
    console.log(`isLoggedIn: ${isLoggedIn}`);
    if (isLoggedIn) {
      this.isLoggedIn = true;

      this.router.navigate(['/person']);
    }
  }

  onSubmit(){
    this.loginRequest.UserName = this.loginForm.controls["username"].value
    this.loginRequest.Password = this.loginForm.controls["password"].value

    this.LoginService.login(this.loginRequest).subscribe({
      next: (data => {

        this.TokenResponse.token = data.token;
        this.TokenService.saveSession(data);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        //console.log(data.token)
        this.reloadPage();
      }),
      error: ((error: HttpErrorResponse) => {
        this.isLoggedIn = false;
        this.isLoginFailed = true;
      })

    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}
