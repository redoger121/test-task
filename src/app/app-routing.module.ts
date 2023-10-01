import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResourcesComponent } from './resources/resources.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';

import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth-guard.service';

import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {path:'', redirectTo:'users', pathMatch:'full'},
  {path:'users', component:UsersComponent, canActivate:[AuthGuard]},
  {path:'users/:id', component:UserComponent, canActivate:[AuthGuard]},
  {path:'resources', component:ResourcesComponent, canActivate:[AuthGuard]},
  {path:'auth', component: AuthComponent,},
  {path: 'not-found', component: ErrorPageComponent, data: {message:'page not found'}},
  {path: '**', redirectTo:'/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
