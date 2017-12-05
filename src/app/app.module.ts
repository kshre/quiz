import { QuizService } from './services/quiz.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { QuizComponent } from './components/quiz.component';
import { PageNotFoundComponent  } from './components/not-found.component';
import { ScoreComponent  } from './components/score.component';
import { HomeComponent  } from  './components/home.component';
import {routing} from './app.routing';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { LoginComponent } from './login/login.component';
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
import { LobbyComponent } from './lobby/lobby.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("560638122721-15ck37tttsl6baeo51959ec64n0kc97m.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("513444962331701")
  },
]);

export function provideConfig() {
  return config;
}
 
@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    PageNotFoundComponent,
    ScoreComponent,
    HomeComponent,
    CountdownTimerComponent,
    LoginComponent,
    LobbyComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    SocialLoginModule,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
