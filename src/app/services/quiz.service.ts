import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  getQuizBycId(cId: Number) {
  
    return this.http.get(`${baseUrl}/quiz/category/${cId}`)
  }
  

  constructor(private http:HttpClient) { }

  public quizzes(){
    return this.http.get(`${baseUrl}/quiz/`)
  }
  

  
  public activequizzes(){
    return this.http.get(`${baseUrl}/quiz/active`)
  }



  public addQuiz(quiz:any){
  return  this.http.post(`${baseUrl}/quiz/`,quiz)
  }

  deleteQuiz(id:any) {
    return  this.http.delete(`${baseUrl}/quiz/${id}`)
     }

     getQuizByID(id:any){
      return this.http.get(`${baseUrl}/quiz/${id}`)
     }

     updateQuiz(quiz:any){
      return  this.http.put(`${baseUrl}/quiz/`,quiz)
     }
}
