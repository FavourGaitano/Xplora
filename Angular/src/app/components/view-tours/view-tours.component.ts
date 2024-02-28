import { Component } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-view-tours',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-tours.component.html',
  styleUrl: './view-tours.component.css'
})
export class ViewToursComponent {

  toursArr: any[]=[];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  paginatedTours: any[] = [];


  constructor(private tours: ToursService) {
    this.fetchTours();
  }

  fetchTours(){

    this.tours.getTours().subscribe(res=>{

      if (res.error) {
        console.log(res.error);
      } else if (res.tours) {
        console.log(res.tours);
        this.toursArr = res.tours;
        this.updatePaginatedTours();
      }
    })

    console.log (this.tours)
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
    this.tours.deleteTour(id).subscribe((res) => {
      console.log(res);
      this.fetchTours();
    });
  }


}
