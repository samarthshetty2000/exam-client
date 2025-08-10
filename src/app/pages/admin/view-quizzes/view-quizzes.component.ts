import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes:any=[

]
  constructor(private quizService:QuizService) { }

  ngOnInit(): void {

    this.quizService.quizzes().subscribe((data:any)=>{
      console.log(data)
      this.quizzes=data
    },(err)=>{
      Swal.fire("Error","Error in data","error")
    })

  }

  deleteQuiz(id:any){
        Swal.fire({
          icon:'info',
          title:"Are you sure??",
          confirmButtonText:'Delete',
          cancelButtonText:'Cancel',
          showCancelButton:true
        }).then((result)=>{
          if(result.isConfirmed){
            this.quizService.deleteQuiz(id).subscribe((data)=>{
              this.quizzes=this.quizzes.filter((element:any)=>{
                    return element.qId!=id
              })
              Swal.fire("success","Quiz deleted Successfully",'success')
              console.log(data)
             },(err)=>{
              Swal.fire("Failure","Could not delete Quiz",'error')
             })
            
          }
          

        })




 
  }

}
