import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import {  combineLatest, EMPTY, Observable, of, Subscription, Subject, BehaviorSubject } from 'rxjs';
import { startWith, catchError,  map, scan, tap, debounceTime, switchMap, finalize, filter } from 'rxjs/operators';
import { Product } from '../models/product'
import { ProductService } from '../services/product.service';

import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductCategoryService } from '../product-categories/product-category-service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
  // improves performance by mimimizing change detection cycles
  // Component is only checked when 
  // 1. @Input properties change
  // 2. Event emits
  // 3. A bound Observable emits 
  // more UI elements added will help 
})
export class ProductsComponent implements OnInit , OnDestroy{

  pageTitle = 'Product List';
  errorMessage = '';
  categories;

  selectedCategoryId = 1;

  searchMoviesCtrl = new FormControl();
  filteredMovies: any;
  isLoading = false;
  errorMsg: string;

  displayFn: any;



// Observable and Observer 
// Observable stream ...
// Observer :  next() , error() , complete()  etc..
// Subject is a special type of Observable that is both 
// an observable AND an observer 

// Observable vs Subject ...
// Observable is Unicast 
// each subscriber gets its own copy of the observable 
// Observable -->  Subscriber 1
// Observable  -->  Subscriber 2 

// Subject is Multicast 
// Subject  --> Subscriber 
//          --> Subscriber 
//          --> Subscriber 
// multiple subscribers share the same stream
// 
// reacting to actions
// create an action stream ( Subject or BehaviorSubject )
// Combine action stream with data stream 
// emit a value to the action stream when an action occurs



// 1. create an action stream
// no other code should use this, so we define it as private
//private categorySelectedSubject = new Subject<number>();
private categorySelectedSubject = new BehaviorSubject<number>(0);
categorySelectedAction$ = this.categorySelectedSubject.asObservable();


  // async pipe 

  // switching to use stream with combinedLatest  combo of products and categories
  //products$ = this.productService.products$
  //products$ = this.productService.productsWithCategory$
  products$ = combineLatest([
    this.productService.productsWithCategory$,
    this.categorySelectedAction$  // This has no initial value when it was a Subject, but we switched to BehaviorSubject
    // we can actually change this Subject  with startWith  
    // OR use a BehaviorSubject
    //this.categorySelectedAction$.pipe(startWith(0)) // this can fix it the have data on the page

  ])
    .pipe(
      // destructure the array elements emitted from combineLatest 
      // the 1st stream emits the steam of products , so we name first array products
      // the 2nd stream emits the selected categoryid everytime the user selects...
      map(([products, selectedCategoryId]) =>
        products.filter(product => 
          selectedCategoryId ? product.categoryId === selectedCategoryId : true
    )),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    )

// Not using this now since changing to use Subject 
  productsSimpleFilter$ = this.productService.productsWithCategory$
      .pipe(
        map(products => 
          products.filter(product =>
            this.selectedCategoryId ? product.categoryId === this.selectedCategoryId : true
          ))
  );

 // Categories for drop down list
 categories$ = this.productCategoryService.productCategories$
 .pipe(
   catchError(err => {
     //this.errorMessageSubject.next(err);
     this.errorMessage = err;
     return EMPTY;
   })
 );

  sub: Subscription; // not suing with observable stream with async pipe

  constructor(
    private productService: ProductService, 
    private productCategoryService : ProductCategoryService,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.searchMoviesCtrl.valueChanges
    .pipe(
      debounceTime(500),
      filter(value => value.length >=2),
      tap(() => {
        this.errorMsg = "";
        this.filteredMovies = [];
        this.isLoading = true;
      }),
      switchMap(value => this.http.get("http://www.omdbapi.com/?s=" + value + "&apikey=bcc4f014")
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
    .subscribe(data => {
      if (data['Search'] == undefined) {
        this.errorMsg = data['Error'];
        this.filteredMovies = [];
      } else {
        this.errorMsg = "";
        this.filteredMovies = data['Search'];
      }

      console.log(this.filteredMovies);
    });

    //

    // this.sub = this.productService.getProducts()
    //   .subscribe(
    //     products => this.products = products,
    //     error => this.errorMessage = error
    //   );

    // Observable stream ( async pipe)
    // benefits
    // 1. no need to subscribe  ( async pipe does that)
    // 2. no need to unsubscribe 
    // 3. improve change detection
    // angular knows ... 
    // default   checkAlways
    // or  OnPush    ( async pipe CAN use the OnPush change detection strategy)
    //This code is procedural , not declarative
    // this.products$ = this.productService.getProducts()
    //      .pipe(
    //        catchError(err => {
    //          this.errorMessage = err;
    //          //return of([]); // could return an empty array
    //          return EMPTY;
    //        })
    //      );
    
           // Just a TEST below
      // this.products$
      //   .pipe(
      //     //tap(x => console.log(x))
      //   ).subscribe(x => console.log('temp:', x))
        // this works to subscribe, then tap works but only if
        // subscribe it on 
        // html code is subscribing to observable ...





     
          
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  onAdd(): void {
    //this.productService.addProduct();
  }

  onSelected(categoryId: string): void {
    //this.categorySelectedSubject.next(+categoryId);
   // console.log('not yet');
   //this.selectedCategoryId = +categoryId;

   // use the Subjects Next method 
   // +  will cast the id to a number

   // emit a value  ...   
    this.categorySelectedSubject.next(+categoryId);
  }





}
