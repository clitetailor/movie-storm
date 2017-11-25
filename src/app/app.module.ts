import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonDesignModule } from './common-design/common-design.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { AuthService } from './auth.service';
import { MovieService } from './movie.service';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpService } from './http.service';
import { SearchService } from './search.service';

const appRoutes = [
  { path: '', component: FrontPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'movie/:id', component: MoviePageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FrontPageComponent,
    LoginPageComponent,
    MoviePageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    ),
    CommonDesignModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    AuthService,
    MovieService,
    HttpService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
