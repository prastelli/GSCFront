import { Injectable } from '@angular/core';
import { TokenResponse } from '../interface/TokenResponse.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecoded } from '../interface/jwtDecoded.interface';
import { jwtObject } from '../interface/jwtObject.interface';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  tokenResponse: TokenResponse = {token: ''};

  jwtHelper = new JwtHelperService();

  jwtObject: jwtObject = {user:'',rol:''};

  constructor() { }

  saveSession(tokenResponse: TokenResponse) {
    window.localStorage.setItem('Token', tokenResponse.token);
  }


  getSession(): TokenResponse | null {
    if (window.localStorage.getItem('Token')) {
      this.tokenResponse.token =  window.localStorage.getItem('Token') || '';
      return this.tokenResponse
    }
    return null
  }
  getDecoded(): jwtObject{
    this.tokenResponse.token = window.localStorage.getItem('Token') || '';
    if (window.localStorage.getItem('Token')) {
      const decoded:jwtDecoded = this.jwtHelper.decodeToken(this.tokenResponse.token)
      this.jwtObject.user = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
      this.jwtObject.rol =  decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    }
    return this.jwtObject
  }


  isLoggedIn(): boolean {
    let session = this.getSession();
    if (!session) {
      return false;
    }
    return true
  }

  logout() {
    window.localStorage.removeItem('Token');
  }
}
