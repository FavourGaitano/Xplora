import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { bookingsResponse0 } from '../../interfaces/bookingsResponse.interface';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-view-bookings',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './user-view-bookings.component.html',
  styleUrls: ['./user-view-bookings.component.css']
})
export class UserViewBookingsComponent implements OnInit {

  successMessage: string = '';
  errorMessage: string = '';
  bookingsArr: any = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  paginatedBookings: any[] = [];





  constructor(
    private bookingsService: BookingsService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.fetchBookings();
  }

  fetchBookings() {
    this.authService.readToken(
      (response) => {
        if (response && response.info && response.info.id) {
          this.bookingsService.getUserBooking(response.info.id).subscribe({
            next: (bookingsResponse) => {
              console.log(bookingsResponse.booking);
              if (bookingsResponse.booking.length > 0) {
                this.bookingsArr = bookingsResponse.booking;
                this.updatePaginatedBookings();
              } else if (bookingsResponse.error) {
                console.error('Error fetching bookings:', bookingsResponse.error.message);
              } else {
                console.error('The booking data is not in the expected format:', bookingsResponse);
              }
            },
            error: (error) => console.error('Error fetching bookings:', error)
          });
        } else {
          console.error('User ID is missing from the token response:', response);
        }
      },
      (error) => console.error('Error decoding token:', error)
    );
  }

  updatePaginatedBookings() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedBookings = this.bookingsArr.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedBookings();
  }

  maxPage(): number {
    return Math.ceil(this.bookingsArr.length / this.itemsPerPage);
  }

  cancelBooking(booking_id: string) {
    const token = localStorage.getItem('authToken') as string;
    this.bookingsService.cancelBooking(booking_id).subscribe({
      next: (res) => {
        this.successMessage =  "Booking successfully cancelled."
        this.errorMessage = '';
        this.fetchBookings();
      },
      error: (error) => {
        this.errorMessage = error.error.message || "An error occurred while cancelling the booking. Please try again.";
        this.successMessage = '';
      }
    });
  }


}
