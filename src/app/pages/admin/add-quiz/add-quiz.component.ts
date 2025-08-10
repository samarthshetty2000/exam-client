import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  quiz={
    title:"",
    description:"",
    maxMarks:"",
    numberOfQuestions:"",
    active:true,
   category:{
    cid:"",
   }
  }
   categories=[{cid:10 ,title:"programing"},{cid:11 ,title:"GK"}]
  constructor(private categoryService:CategoryService,private quizServices:QuizService,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data:any)=>{
      this.categories=data
    })
  }

  addQuiz(){
    console.log(this.quiz)

    if(this.quiz.title.trim()=="" || this.quiz.title==null){
      this.snack.open("Enter the title","",{duration:3000})
      return
    }

    this.quizServices.addQuiz(this.quiz).subscribe((data:any)=>{
      Swal.fire("Success","Quiz added Successfully","success")
      this.quiz={

        title:"",
    description:"",
    maxMarks:"",
    numberOfQuestions:"",
    active:true,
   category:{
    cid:"",
   }

      }
      
    },(error)=>{
      Swal.fire("Failure","failed to add","error")
    })
  }

}
