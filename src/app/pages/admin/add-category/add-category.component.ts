import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  public category:any={
    title:"",
    description:""
  }

  constructor(private categoryService:CategoryService,private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  addCategory()
{

  if(this.category.title.trim()=="" || this.category.title==null){
    this.snack.open("Title Required ","",{duration:3000})
    return

  }
  this.categoryService.addCategory(this.category).subscribe((data:any)=>{
    this.category={
      title:"",
      description:""
    }
    Swal.fire("Successfull","Category Added Succesfully","success")
  },(err)=>{
    Swal.fire("Failed ","Failed to add Category","error")
  })
}
}
