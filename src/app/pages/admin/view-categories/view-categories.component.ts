import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  categories:any=[]

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data:any)=>{
      console.log(data)
      this.categories=data
    })

  }

}
