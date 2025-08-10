import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {
  qId:any
  questions:any=null
  correctAnswers: number=0;
  marksGot:any
  attempted: any=0;
  isSubmitted=false
  timer:any
  t: any;
  
  constructor(private route:ActivatedRoute,private questionService:QuestionsService,   private locationStrategy: LocationStrategy) { }

  ngOnInit(): void {

    this.preventBackButton()
   this.qId= this.route.snapshot.params['qId']
    console.log(this.qId)

    this.questionService.getUserQuiz(this.qId).subscribe((data)=>{
      console.log(data)
      this.questions=data
      this.timer=this.questions.length*1*60
      // this.questions.forEach((q:any )=> {
      //   q['givenAnswer']=""
        
      // });
      this.startTimer()

      console.log(this.questions)
    })
  }

  preventBackButton() {
    history.pushState(null,'', location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    })
  }

  submitQuiz(){
    this.correctAnswers=0

    Swal.fire({
      title:"Do you want to submit quiz???",
      
      showCancelButton:true,
      confirmButtonText:'Submit',
      icon:'info'

    }).then((result)=>{
         
         if(result.isConfirmed){
        this.evalQuiz()
        clearInterval(this.t)
        
         
        }
    })

    

  }



  startTimer(){
    this.t=setInterval(()=>{
     if(this.timer<=0){
      this.evalQuiz()
         clearInterval(this.t)
     }
     else {
         this.timer--
         console.log(this.timer)
     }
    },1000)
  }

  evalQuiz(){
    this.isSubmitted=true
    // let ms=this.questions[0].quiz.maxMarks/this.questions.length
    

    // this.questions.forEach((q:any )=> {
    //  if(q.answer==q.givenAnswer){
    //   this.correctAnswers++
    //  }
    //  if(q.givenAnswer.trim()!=''){
    //   this.attempted++
    //   console.log(this.attempted)
    //  }
   
      
    // });
    // console.log(this.correctAnswers)
    // this.marksGot=this.correctAnswers*ms
    // console.log(this.marksGot)

    this.questionService.submitQuiz( this.questions).subscribe((data:any)=>{
      console.log(data)
      this.correctAnswers=data.correctAnswers
      this.marksGot=data.marksGot
      this.attempted=data.attempted
    })
    
  }


  formatTime(){
    let mm=Math.floor(this.timer/60)
    let ss=this.timer-mm*60
    return `${mm} min: ${ss} sec`
  }
  printPage(){
    print()
  }

}
