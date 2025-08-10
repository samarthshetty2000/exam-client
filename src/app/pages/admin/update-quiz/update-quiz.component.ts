import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  qId: any;
  quiz:any=null
  categories:any=[]
  constructor(private route:ActivatedRoute,private quizService:QuizService,private categoryService:CategoryService,private router:Router) { }

  ngOnInit(): void {
    this.qId=this.route.snapshot.params['qid']

    this.quizService.getQuizByID(this.qId).subscribe((data:any)=>{
      this.quiz=data
      console.log(data)
    })
     this.categoryService.getCategories().subscribe((data)=>{
      console.log(data)
      this.categories=data
     })
   
  }

  updateQuiz()
{
   console.log(this.quiz)
   this.quizService.updateQuiz(this.quiz).subscribe((data)=>{
    console.log(data)
    Swal.fire("Success","Quiz Updated Succesfully","success").then(()=>{
      this.router.navigate(["admin-dashboard/quiz"])

    })


   })


}


}
