import { ScoreComponent } from './score.component';
import { CountdownTimerComponent } from './../countdown-timer/countdown-timer.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { reject } from 'q';
import { Http } from "@angular/http";

@Component({
  selector: 'quiz',
  templateUrl: 'quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})

export class QuizComponent implements OnInit, OnDestroy {

  q: any;
  foo: any;
  sub: any;
  id: number;
  cQuestion: number;
  score: number;
  qNumber: number;
  questionTime: number;
  answerTime: number;
  postTime: number;
  correctAnswer: boolean;
  answered: boolean= false;
  unansweredQuestions= 0;
  counter=0;
  constructor(private QuizService: QuizService, private route: ActivatedRoute, private router: Router, private http: Http ) {
    this.score = 0;
    
  }


  sendAnswer(o,e)
  {
    this.counter++;
    this.answerTime=performance.now();
    this.postTime= this.answerTime-this.questionTime;
    if(o==this.q.correct_answer)
    {
    this.correctAnswer=true;
    this.score+=this.postTime*1;
    }
    else
    {
    this.correctAnswer=false;
    this.score=this.postTime*5;
    }
    /*const req= this.http.put('https://api.mlab.com/api/1/databases/quizmasters1/collections/answers?f={"_id":0}&s={"timestamp":1}&apiKey=aMBn_oLsrDEupTvuckLPqxngAhoEW1U1', {
      username: o,
      timestamp: this.postTime,
      quizid: 5,
      questionNum: this.id,
      correct: this.correctAnswer,
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );*/
  
  }
 
  ngOnInit() {

    this.getData();
    this.nextQuestion();
  }

      nextQuestion()
      {
        if(this.id==1)
        {
          this.questionTime=performance.now();
          setTimeout(() => 
          {
            CountdownTimerComponent.prototype.update();                    
            this.router.navigate(['/' + (this.id + 1)]);
            this.nextQuestion();
          },
          11000);
        }
        else
        setTimeout(() => 
        {
          this.questionTime=performance.now();
          CountdownTimerComponent.prototype.update();
          if(this.id<10){
          this.router.navigate(['/' + (this.id + 1)]);
          this.nextQuestion();
        }          
        else{
          this.sendScore();
          this.router.navigateByUrl('score');          
        }
        },
        11000);
      }
        
      
      getData(){
        this.sub = this.route.params.subscribe(params => {
          // (+) converts string 'id' to a number
          // fetch the file and get next Question
          this.id = +params['id'];
    
          if (localStorage.getItem('q') !== null) {
            var data = JSON.parse(localStorage.getItem('q'))
            this.qNumber = parseInt(localStorage.getItem('qNumber'))
            this.q = data.results[this.id - 1]
           
          } else {
            this.QuizService.getQuestion()
            var data = JSON.parse(localStorage.getItem('q'))
            this.qNumber = parseInt(localStorage.getItem('qNumber'))
            this.q = data.results[this.id - 1]
          }
    
        });
    }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  sendScore()
  {
    this.score+=(10-this.counter)*10;
    const sendScore = this.http.post('https://api.mlab.com/api/1/databases/quizmasters1/collections/score?apiKey=aMBn_oLsrDEupTvuckLPqxngAhoEW1U1', {
      quizid: 1,
      username: localStorage.getItem("userName"),
      score: this.score,
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
  }
}

