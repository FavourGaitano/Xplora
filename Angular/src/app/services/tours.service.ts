import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{tourResponse} from '../interfaces/toursResponse.interface';
import { updateTour } from '../interfaces/tours.interface';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  token = localStorage.getItem('authToken') as string
  constructor(private http:HttpClient) { }

  getTours(){
    const token = localStorage.getItem('authToken') as string
    return this.http.get<tourResponse>('http://localhost:3001/tours/get', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }

  deleteTour(id:string){
    const token = localStorage.getItem('authToken') as string
    return this.http.delete(`http://localhost:3001/tours/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }

  getOneTourDetails(id:string){
    const token = localStorage.getItem('authToken') as string

    return this.http.get<tourResponse>(`http://localhost:3001/tours/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }


  updateTourDetails(id:string, details:updateTour){

    const token = localStorage.getItem('authToken') as string

    return this.http.put<{message:string, error:string}>(` http://localhost:3001/tours/update/${id}`, details,{
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }
}
