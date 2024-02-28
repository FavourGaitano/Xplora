import { Component } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-view-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.css'
})
export class ViewCategoryComponent {

  successMessage: string = '';
  errorMessage: string = '';

  categoriesArr: any[]=[];

  constructor(private categories: CategoriesService) {
    this.fetchCategories();
  }

  fetchCategories(){

    this.categories.getCategories().subscribe(res=>{

      if (res.error) {
        console.log(res.error);
      } else if (res.categories) {
        console.log(res.categories);
        this.categoriesArr = res.categories;
      }
    })

    console.log (this.categories)
  }

  deleteCategory(id: string) {
    this.categories.deleteCategory(id).subscribe({
      next: (res) => {
      console.log(res);
      this.successMessage = 'Category deleted successfully.';
      this.errorMessage = '';
      this.fetchCategories();
    },
    error: (error) => {
      console.error(error);
      this.errorMessage = 'Failed to delete the category. Please try again.';
      this.successMessage = '';
    }
    });
  }

}
