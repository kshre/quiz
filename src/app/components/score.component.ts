import { QuizService } from './../services/quiz.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';


@Component({
  selector: 'score',
  templateUrl: './score.component.html',
  styleUrls:['./score.component.css'],
  providers:[QuizService],
})

export class ScoreComponent implements OnInit {
  score : any;
  constructor(private route: ActivatedRoute, private router: Router, private http: Http, private quizService: QuizService) {
    
  }
  sub:any;
  winner: any;
  second: any;
  third: any;
  fourth: any;
  fifth: any;

    ngOnInit() 
    {
      console.log(this.quizService.getResults());
      setTimeout(() => {
        this.showResults();
      }, 5000);
      
    }
    showResults()
    {
      this.winner=localStorage.getItem("winner");
      this.second= localStorage.getItem("second");
      this.third= localStorage.getItem("third");
      this.fourth= localStorage.getItem('fourth');
      this.fifth= localStorage.getItem('fifth');
      console.log(this.winner);
    }
    
    }
    