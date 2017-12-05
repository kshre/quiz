import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Rx';

@Injectable()
export class QuizService {
    constructor(private http: Http) {
    }
    getQuestion() {
        return this.http.get('https://api.mlab.com/api/1/databases/quizmasters1/collections/quizzes?f={"_id":0}&fo=true&apiKey=aMBn_oLsrDEupTvuckLPqxngAhoEW1U1')
            .map(res => res.json()).subscribe(
            data => {
                // shuffle questions
                for (var i = 0; i < data.results.length - 1; i++) {
                    var j = i + Math.floor(Math.random() * (data.results.length - i));

                    var temp = data.results[j];
                    data[j] = data.results[i];
                   
                    data[j].incorrect_answers.push(data[j].correct_answer)
                   
                    data[i] = temp;
                }
                localStorage.setItem("q", JSON.stringify(data))
                localStorage.setItem("qNumber", JSON.stringify(data.length))
            },
            err => console.error(err)
            )
      
    }
    getResults()
    {
        return this.http.get('https://api.mlab.com/api/1/databases/quizmasters1/collections/results?f={"_id":0}&fo=true&apiKey=aMBn_oLsrDEupTvuckLPqxngAhoEW1U1')
        .map(res => res.json()).subscribe(
        data => {
            // shuffle questions
            localStorage.setItem("winner",JSON.stringify(data.winner))
            localStorage.setItem("second",JSON.stringify(data.second))
            localStorage.setItem("third",JSON.stringify(data.third))
            localStorage.setItem("fourth",JSON.stringify(data.fourth))
            localStorage.setItem("fifth",JSON.stringify(data.fifth))
            }
        ,
        err => console.error(err)
        )
        
  
    }



}