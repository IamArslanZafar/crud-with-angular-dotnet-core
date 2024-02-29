import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IProduct } from './interfaces/product';
import { IResponseObject } from './interfaces/responseObject';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl = 'https://localhost:7150';
  // http = inject(HttpClient);
  constructor(private http: HttpClient) {}


  getAllProduct(): Observable<IResponseObject> {
    return this.http.get<IResponseObject>(`${this.apiUrl}/api/Product`).pipe(
      catchError(error => {
        console.error('Error fetching products:', error);
        return throwError('Something went wrong while fetching products.');
      })
    );
  }
  
  
  createProduct(Product: IProduct) {
    return this.http.post<IResponseObject>(this.apiUrl + '/api/Product', Product);
  }
  getProduct(ProductId: number) {
    return this.http.get<IResponseObject>(
      this.apiUrl + '/api/Product/' + ProductId
    );
  }
  updateProduct(ProductId: number, Product: IProduct) {
    return this.http.put<IResponseObject>(
      this.apiUrl + '/api/Product/' + ProductId,
      Product
    );
  }
  deleteProduct(ProductId: number) {
    return this.http.delete<IResponseObject>(this.apiUrl + '/api/Product/' + ProductId);
  }
  private handleError(error: any): Observable<never> {
    // Log the error
    console.error('An error occurred:', error);

    // Let the app keep running by returning an empty result.
    return throwError('Something bad happened; please try again later.');
  }
}
