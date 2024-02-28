import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { CategoryDetails } from '../../interfaces/categories.interface';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {

  updateCategoryForm!:FormGroup
  successMessage: string = '';
  errorMessage: string = '';

  id!: string
  Categories!:CategoryDetails
  preArr: any[]=[];
  constructor(private fb: FormBuilder, private route:ActivatedRoute, private category: CategoriesService){

    this.getCategoryId()

    // this.updateCategoryForm = this.fb.group({
    //   name: ['', [Validators.required]],

    // })
  }

  populateForm(){
    this.updateCategoryForm = this.fb.group({
      name: [this.preArr[0].name, [Validators.required]]

    })
  }

  getCategoryId(){
    this.route.params.subscribe(res=>{
      console.log(res['category_id']);
      this.id = res['category_id']

      this.getCategoryDetails()
    })
  }

  getCategoryDetails(){
    this.category.getOneCategoryDetails(this.id).subscribe(res=>{
      console.log(this.preArr[0].name);
      this.preArr = res.categories
      console.log(this.preArr[0]);
      this.populateForm()




    })
  }

  updateCategory(){
    if (this.updateCategoryForm.valid) {
      this.category.updateCategoryDetails(this.id, this.updateCategoryForm.value).subscribe({
        next: (res) => {
          this.successMessage = "Category updated successfully!";
          console.log(res);
        },
        error: (error) => {
          this.errorMessage = "Failed to update category. Please try again.";
          console.error(error);
        }
      });
    } else {
      this.errorMessage = "Please fill all required fields correctly.";
    }
  }

}
