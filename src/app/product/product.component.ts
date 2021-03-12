import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
//import { AppState } from './../app.state';


import { Store } from '@ngrx/store';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
