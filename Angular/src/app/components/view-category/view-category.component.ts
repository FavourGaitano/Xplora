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
    this.categories.deleteCategory(id).subscribe((res) => {
      console.log(res);
      this.fetchCategories();
    });
  }

}
