import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private http: HttpClient) {}
  url = environment.url;

  getProduct(): Observable<any> {
    return this.http.get<any>(this.url);
  }
  createProduct(form: any): Observable<any> {
    return this.http.post<any>(`${this.url}/add`, form);
  }
  updateProduct(form: any, id: any): Observable<any> {
    console.log(JSON.stringify(id));
    return this.http.put<any>(`${this.url}/${id}`, form);
  }
  deleteProduct(form: any): Observable<any> {
    console.log(`${this.url}/${form}`);
    return this.http.delete<any>(`${this.url}/${form}`);
  }
  searchProducts(searchTerm: string): Observable<any[]> {
    return this.http.get<any[]>(
      `https://dummyapi.io/data/api/products?search=${searchTerm}`
    );
  }
}
