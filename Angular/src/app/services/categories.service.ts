import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CategoryDetails} from '../interfaces/categories.interface';
import {updateCategory} from '../interfaces/categories.interface';
import {categoriesResponse} from '../interfaces/categoriesResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  token = localStorage.getItem('authToken') as string

  constructor(private http:HttpClient) { }

  getCategories(){
    const token = localStorage.getItem('authToken') as string
    return this.http.get<categoriesResponse>('http://localhost:3001/categories/get', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }

  deleteCategory(id:string){
    const token = localStorage.getItem('authToken') as string
    return this.http.delete(`http://localhost:3001/categories/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }

  getOneCategoryDetails(id:string){
    const token = localStorage.getItem('authToken') as string

    return this.http.get<categoriesResponse>(` http://localhost:3001/categories/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }


  updateCategoryDetails(id:string, details:updateCategory){

    const token = localStorage.getItem('authToken') as string

    return this.http.put<{message:string, error:string}>(` http://localhost:3001/categories/update/${id}`, details,{
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token
      })
    })
  }
}
