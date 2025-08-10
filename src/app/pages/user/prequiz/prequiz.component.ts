import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prequiz',
  templateUrl: './prequiz.component.html',
  styleUrls: ['./prequiz.component.css']
})
export class PrequizComponent implements OnInit {
  qId: any;
  quiz:any

  constructor(private quizService:QuizService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {

    this.qId=this.route.snapshot.params['qId']
    this.quizService.getQuizByID(this.qId).subscribe((data)=>{
      console.log(data)
      this.quiz=data
    })
  }

  startQuiz(){

    Swal.fire({
      title:"Do you want to start quiz???",
      
      showCancelButton:true,
      confirmButtonText:'start',
      icon:'info'

    }).then((result)=>{
         if(result.isConfirmed){
          this.router.navigate(['/start-quiz/'+this.qId])
         }
    })

  }

}
