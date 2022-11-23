import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { ListPersonComponent } from './person/list-person/list-person.component';
import { DisplayPersonComponent } from './person/display-person/display-person.component';
import { AddeditPersonComponent } from './person/addedit-person/addedit-person.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'person', component: ListPersonComponent , canActivate: [AuthGuard]},
  { path: 'add', component: AddeditPersonComponent , canActivate: [AuthGuard]},
  { path: 'display/:id', component: DisplayPersonComponent , canActivate: [AuthGuard]},
  { path: 'edit/:id', component: AddeditPersonComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
