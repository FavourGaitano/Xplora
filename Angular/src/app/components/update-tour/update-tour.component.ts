import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import  {ToursService} from '../../services/tours.service';
import {Tour} from '../../interfaces/tours.interface';


@Component({
  selector: 'app-update-tour',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-tour.component.html',
  styleUrl: './update-tour.component.css'
})
export class UpdateTourComponent {

  updateTourForm!:FormGroup
  successMessage: string = '';
  errorMessage: string = '';


  id!: string
  Tours!:Tour
  preArr: any[]=[];
  constructor(private fb: FormBuilder, private route:ActivatedRoute, private toursService: ToursService){
    this.getTourId()

  }

  populateForm(){
     this.updateTourForm = this.fb.group({
      title: [this.preArr[0].title, [Validators.required]],
      image: [this.preArr[0].image, [Validators.required]],
      description: [this.preArr[0].description, [Validators.required]],
      location: [this.preArr[0].location, [Validators.required]],
      start_date: [this.preArr[0].start_date, [Validators.required]],
      end_date: [this.preArr[0].end_date, [Validators.required]],
      price: [this.preArr[0].price, [Validators.required]],
      category_id: [this.preArr[0].category_id, [Validators.required]]

    })
  }


  getTourId(){
    this.route.params.subscribe(res=>{
      console.log(res['tour_id']);
      this.id = res['tour_id']

      this.getTourDetails()
    })
  }

  getTourDetails(){
    this.toursService.getOneTourDetails(this.id).subscribe(res=>{
      // console.log(res.tours[0]);
      // this.Tours = res.tours[0]
      this.preArr = res.tours
      console.log(this.preArr[0]);
      this.populateForm()

      // this.updateTourForm.patchValue({tile: this.Tours.title})


    })
  }

  updateTour() {
    if (this.updateTourForm.valid) {
      this.toursService.updateTourDetails(this.id, this.updateTourForm.value).subscribe({
        next: (res) => {
          this.successMessage = "Tour updated successfully!";
          this.errorMessage = '';

        },
        error: (error) => {
          this.errorMessage = "Failed to update the tour. Please try again.";
          this.successMessage = '';
        }
      });
    } else {
      this.errorMessage = "Please ensure all fields are filled out correctly.";
      this.successMessage = '';
    }
  }


}
