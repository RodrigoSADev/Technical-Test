import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IProduct, IResponseProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);

  private apiUrl = 'http://rest-items.research.cloudonix.io/items';
  products = signal<IProduct[]>([]);

  getProducts(): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(this.apiUrl)
      .pipe(tap((products) => this.products.set(products)));
  }

  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: IResponseProduct): Observable<IResponseProduct> {
    return this.http
      .post<IResponseProduct>(this.apiUrl, product)
      .pipe(
        tap((newProduct) =>
          this.products.update((products) => [...products, newProduct])
        )
      );
  }

  updateProduct(product: IResponseProduct): Observable<IResponseProduct> {
    return this.http
      .patch<IResponseProduct>(`${this.apiUrl}/${product.id}`, product)
      .pipe(
        tap((updatedProduct) =>
          this.products.update((products) =>
            products.map((p) =>
              p.id === updatedProduct.id ? updatedProduct : p
            )
          )
        )
      );
  }

  deleteProduct(id: number): Observable<IProduct> {
    return this.http
      .delete<IProduct>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() =>
          this.products.update((products) =>
            products.filter((product) => product.id !== id)
          )
        )
      );
  }

  // getProducts(): Observable<IProduct[]> {
  //   return this.http.get<IProduct[]>(this.apiUrl);
  // }

  // getProductById(id: string): Observable<IProduct> {
  //   return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  // }

  // addProduct(product: IResponseProduct): Observable<IResponseProduct> {
  //   return this.http.post<IResponseProduct>(this.apiUrl, product);
  // }

  // updateProduct(product: IResponseProduct): Observable<IResponseProduct> {
  //   return this.http.patch<IResponseProduct>(
  //     `${this.apiUrl}/${product.id}`,
  //     product
  //   );
  // }

  // deleteProduct(id: number): Observable<IProduct> {
  //   return this.http.delete<IProduct>(`${this.apiUrl}/${id}`);
  // }
}
