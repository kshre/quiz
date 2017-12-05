import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";



@Component({
  selector: 'app-login',
  templateUrl: './newLogin.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private http: Http, private router: Router) { }
  private user: SocialUser;
  private loggedIn: boolean;
  counter: number=1;
  
   signInWithGoogle(): void {
     this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
   }
   signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
 
  signOut(): void {
    this.authService.signOut();
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);        
    });
  }
  sendData()
  {
    localStorage.setItem("userName",this.user.name);
    if(this.counter==1)
    {
    this.http.post('https://api.mlab.com/api/1/databases/quizmasters1/collections/users?apiKey=aMBn_oLsrDEupTvuckLPqxngAhoEW1U1', {
      userName: this.user.name,
      id: this.user.id,
      userPic: this.user.photoUrl,
      
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
    this.counter+=1;
  }
}
goToLobby()
{
  this.router.navigateByUrl('lobby');
}

}
