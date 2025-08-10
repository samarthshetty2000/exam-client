import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
   qId:number=0
   public Editor = ClassicEditor;
   question:any={
      quiz:{
       

      },
      content:"",
      option1:"",
      option2:"",
      option3:"",
      option4:"",
      answer:""
   }
  constructor(private route :ActivatedRoute,private questionService:QuestionsService,private snack:MatSnackBar) { }

  ngOnInit(): void {

   this.qId= this.route.snapshot.params['qid']
   console.log(this.qId)
 this.question.quiz.qId=this.qId
//  console.log(this.question)



  }

  formSubmit(){
    console.log(this.question)
    this.questionService.postQuestion(this.question).subscribe((data)=>{
      if(this.question.content.trim()=="" || this.question.content==null){
        this.snack.open("Question Required","",{duration:3000})
        return; 
      }
      if(this.question.option1.trim()=="" || this.question.option1==null){

        console.log(this.question.option1)
        this.snack.open("Option1 Required","",{duration:3000})
        return; 
      }
      if(this.question.option2.trim()=="" || this.question.option2==null){
        this.snack.open("Option2 Required","",{duration:3000})
        return; 
      }
      if(this.question.answer.trim()=="" || this.question.answer==null){
        this.snack.open("Answer Required","",{duration:3000})
        return; 
      }
      console.log(data)
      Swal.fire("Success","Question AAdded Succesfully","success")
      this.question.content="",
      this.question.option1="",
      this.question.option2="",
      this.question.option3="",
      this.question.option4="",
      this.question.answer=""
     
    })
  
  }

}
