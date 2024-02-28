import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';




@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css'
})
export class ToursComponent {

  ToursForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';


  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService,private categories: CategoriesService ) {
    this.ToursForm = this.fb.group({

      title: ['', [Validators.required]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category_id: ['', [Validators.required]]

    })

  }

  ngOnInit(): void {


      this.fetchCategories();

  }




  ToursUser(): void {
    if (this.ToursForm.valid) {
      this.authService.createTour(this.ToursForm.value).subscribe({
        next: (TourResponse) => {
          console.log(TourResponse);
          this.successMessage = 'Tour created successfully!';
          this.errorMessage = '';
        },
        error: (error) => {
          console.error("Tour creation failed", error);
          this.errorMessage = 'Failed to create tour. Please try again.';
          this.successMessage = '';
        }
      });
    } else {
      console.error("Tour form is invalid");
      this.errorMessage = 'Please fill in all required fields.';
      this.successMessage = '';
    }
  }





  categoriesArr: any[]=[];

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


}
