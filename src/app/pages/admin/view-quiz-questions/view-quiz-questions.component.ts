import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
   qId:any
   qtitle:any
   questions:any=[]

  constructor(private route:ActivatedRoute,private questionService:QuestionsService) { }

  ngOnInit(): void {
    this.qId=this.route.snapshot.params['qid']
    this.qtitle=this.route.snapshot.params['title']
    console.log(this.qId)
    this.questionService.getQuestionByQuizId(this.qId).subscribe((data:any)=>{
      this.questions=data
      console.log(this.questions)
    },(err)=>{
      console.log(err)
    })
     

  }




  delete(id:any){

    console.log(id)

    Swal.fire({
      confirmButtonText:"Delete",
      cancelButtonText:"Cancel",
      showCancelButton:true,
      title:"Are you sure?"
    }).then((result:any)=>{
      if(result.isConfirmed){
        this.questionService.deleteQuestion(id).subscribe((data)=>{
          this.questions=this.questions.filter((data:any)=>{
            console.log(data.id)
            return (data.quesId!=id)
          })
          console.log()
        })

      }
    })

    

  }

}
