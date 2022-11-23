import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login/login.component';
import { MaterialModule } from './shared/material/material.module';
import { ListPersonComponent } from './person/list-person/list-person.component';
import { NavBarComponent } from './shared/navbar/navbar.component';

import { DisplayPersonComponent } from './person/display-person/display-person.component';
import { AddeditPersonComponent } from './person/addedit-person/addedit-person.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListPersonComponent,
    NavBarComponent,
    DisplayPersonComponent,
    AddeditPersonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    AuthInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
