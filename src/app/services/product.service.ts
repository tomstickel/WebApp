import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { combineLatest, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProductCategoryService } from '../product-categories/product-category-service';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productsUrl = 'api/products';
    
    OLDproducts$ = this.http.get<Product[]>(this.productsUrl)
            .pipe(
                // map the emitted array 
                // this is an array of products
                //map(item => item.price * 1.5),
                //map(products => products),
                // need to use the array's map method
                map(products =>
                   // products.map(product => product.price * 1.5)),
                   products.map(product => ({
                    //id : product.id,
                    //productName: product.productName,
                    //productCode: product.productCode,
                    //description: product.description,
                    // instead of above we can use the 
                    // spread operator.
                    // It copies all the values from the old to the new object
                    
                    ...product,
                    price: product.price * 1.5,
                    searchKey: [product.productName],
                    category: this.getCategory(product.categoryId)
                   }) as Product)),
                   //}))), //as Product)),
                tap(data => console.log('Products: ', JSON.stringify(data))),
                catchError(this.handleError)
            );
    
    products$ = this.http.get<Product[]>(this.productsUrl)
                   .pipe(
                        tap(data => console.log('Products: ', JSON.stringify(data))),
                        catchError(this.handleError)
                   );
    
     productsWithCategory$ = combineLatest([
         this.products$,
         this.productCategoryService.productCategories$
     ]).pipe(
         map(([products, categories]) => 
             products.map(product => ({
                 ...product,
                price: product.price * 1.5,
                searchKey: [product.productName],
                category: categories.find(c => product.categoryId === c.id).name
             }) as Product)
         )
     );        
    
            
    constructor(private http: HttpClient, private productCategoryService: ProductCategoryService)
    {}


    getCategory(category:number){
        return "test";
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productsUrl)
            .pipe(
                
                tap(data => console.log('Products: ', JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    



    private handleError(err: any): Observable<never> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
      }


}