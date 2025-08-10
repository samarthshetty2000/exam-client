import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  cid:Number=0
  quizzes:any=[]
  constructor(private route:ActivatedRoute,private quizService:QuizService) { }

  ngOnInit(): void {

    this.route.params.subscribe((params:any)=>{
      this.cid=params.cId
      console.log(this.cid)
      if(this.cid==0){

        this.quizService.activequizzes().subscribe((data)=>{
          console.log(data)
          this.quizzes=data
        })
      }
      else{
    
        
        this.quizService.getQuizBycId(this.cid).subscribe((data)=>{
          this.quizzes=data
        })
      }
    })

    this.cid=this.route.snapshot.params['cId']
    console.log(this.cid)

   
  }

}
