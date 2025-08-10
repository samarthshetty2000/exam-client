import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  submitQuiz(quiz:any) {
    return this.http.post(`${baseUrl}/question/eval-quiz`,quiz)
  }

  constructor(private http:HttpClient) { }
  

  getUserQuiz(id:any){
    return this.http.get(`${baseUrl}/question/quiz/${id}`)
  }

  getQuestionByQuizId(id:any){
     return this.http.get(`${baseUrl}/question/quiz/all/${id}`)
  }

  postQuestion(question:any){
    return this.http.post(`${baseUrl}/question/`,question)
  }

  deleteQuestion(id:any){
    return this.http.delete(`${baseUrl}/question/${id}`)
  }
}
