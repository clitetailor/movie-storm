import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { InputWrapperComponent } from './login-page/input-wrapper/input-wrapper.component';
import { SideInfoComponent } from './movie-page/side-info/side-info.component';

const appRoutes = [
  { path: '', component: FrontPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'movie', component: MoviePageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FrontPageComponent,
    LoginPageComponent,
    MoviePageComponent,
    InputWrapperComponent,
    SideInfoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
