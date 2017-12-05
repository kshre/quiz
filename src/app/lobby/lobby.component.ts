import { QuizService } from './../services/quiz.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { setTestabilityGetter } from '@angular/core/src/testability/testability';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
  providers: [[ DomSanitizer ]]
})
export class LobbyComponent implements OnInit {

  constructor(private http: Http, private router: Router,private sanitizer: DomSanitizer) { }

  first : any;
  second : any;
  third : any;
  fourth : any;
  fifth : any;
  firstPic: any;
  secondPic: any;
  thirdPic: any;
  fourthPic: any;
  fifthPic: any;
  public url: SafeResourceUrl;

  ngOnInit() {
    
     this.getLobby();
     this.goToGame();
  }
       
    getLobby()
    {
      return this.http.get('https://api.mlab.com/api/1/databases/quizmasters1/collections/lobby?f={"_id":0}&fo=true&apiKey=aMBn_oLsrDEupTvuckLPqxngAhoEW1U1')
      .map(res => res.json()).subscribe(
      data => {
          // shuffle questions
          this.first=JSON.stringify(data.first)
          this.second=JSON.stringify(data.second)
          this.third=JSON.stringify(data.third)
          this.fourth=JSON.stringify(data.fourth)
          this.fifth=JSON.stringify(data.fifth)
          this.firstPic=JSON.stringify(data.pic1)
          this.secondPic=JSON.stringify(data.pic2)
          this.thirdPic=JSON.stringify(data.pic3)
          this.fourthPic=JSON.stringify(data.pic4)
          this.fifthPic=JSON.stringify(data.pic5)
          console.log(data);          
          }
      ,
      err => console.error(err)
      )
      
    }
    goToGame()
    {
    setTimeout(() => {
      this.router.navigateByUrl('/1');
    }, 30000);
    }
   
}
