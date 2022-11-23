import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import { jwtObject } from '../../interface/jwtObject.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {
  isLoggedIn = false;
  jwtObject!: jwtObject;

  constructor(private tokenService: TokenService, private router: Router,private TokenService:TokenService) { }

  ngOnInit(): void {
    this.jwtObject = this.TokenService.getDecoded()
  }

  logout(): void {
    this.tokenService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
    return
  }
}
