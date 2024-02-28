import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ToursComponent } from '../tours/tours.component';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-view-tours',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, ToursComponent],
  templateUrl: './user-view-tours.component.html',
  styleUrls: ['./user-view-tours.component.css']
})
export class UserViewToursComponent implements OnInit {
  toursArr: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 4;
  paginatedTours: any[] = []

  successMessage: string = '';
  errorMessage: string = '';



  constructor(private tours: ToursService, private auth: AuthService, private router: Router, private api: ApiService) {}

  ngOnInit() {
    this.fetchTours();

  }

  fetchTours() {
    this.tours.getTours().subscribe({
      next: (res) => {
        this.toursArr = res.tours;
        this.updatePaginatedTours();
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch tours. Please try again later.';
        console.error('Error fetching tours:', error);
      }
    });
  }

  updatePaginatedTours() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTours = this.toursArr.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedTours();
  }

  maxPage(): number {
    return Math.ceil(this.toursArr.length / this.itemsPerPage);
  }

  
  deletetour(id: string) {
    this.tours.deleteTour(id).subscribe({
      next: (res) => {
        this.successMessage = 'Tour deleted successfully.';
        this.fetchTours();
      },
      error: (error) => {
        this.errorMessage = 'Failed to delete tour. Please try again.';
        console.error('Error deleting tour:', error);
      }
    });
  }


  onBookNow(tourId: string) {
    if (!tourId) {
      this.errorMessage = 'Tour ID is undefined. Cannot proceed with booking.';
      return;
    }

    console.log('Tour ID:', tourId);

    this.auth.readToken(
      (tokenResponse) => {
        const userId = tokenResponse.info.id;
        if (!userId) {
          this.errorMessage = 'User ID is missing or not retrieved correctly. Cannot proceed with booking.';
          return;
        }

        const bookingDetails = {
          user_id: userId,
          tour_id: tourId,
        };

        console.log('Booking details:', bookingDetails);

        this.auth.createBooking(bookingDetails).subscribe({
          next: (response) => {
            this.successMessage = 'Booking created successfully. Enjoy your tour!';
            console.log('Booking created successfully:', response);
          },
          error: (error) => {
            this.errorMessage = 'You have already booked this tour. Cannot book again.';
            console.error('Error creating booking', error);
            // Error creating booking. Please try again.

          }
        });
      },
      (error) => {
        this.errorMessage = 'Error fetching user details. Cannot proceed with booking.';
        console.error("Error fetching user details with token", error);
      }
    );
  }

}
