import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResourcesComponent } from './resources/resources.component';
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './users/user/user.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinerComponent } from './shared/loading-spiner/loading-spiner.component';
import { AlertComponent } from './shared/alert/alert.component';
import { authInterceptorService } from './auth/auth.interceptor.service';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ResourcesComponent,
    UsersComponent,
    HeaderComponent,
    UserComponent,
    UserEditComponent,
    AuthComponent,
    LoadingSpinerComponent,
    AlertComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:authInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
