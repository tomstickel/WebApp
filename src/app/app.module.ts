import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventsComponent } from './events/events.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventthumbnailComponent } from './eventthumbnail/eventthumbnail.component';
import { MainComponent } from './main/main.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';


import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { ProductComponent } from './product/product.component';
import { EffectsModule } from '@ngrx/effects';

import { addProductReducer } from './reducers/product.reducer';
import { ProductsComponent } from './products/products.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppData } from './app.data';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventsComponent,
    EventsListComponent,
    EventthumbnailComponent,
    MainComponent,
    DialogBoxComponent,
    ProductComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    //StoreModule.forRoot({}, {}),
    StoreModule.forRoot({product: addProductReducer}),
    EffectsModule.forRoot([]),
    InMemoryWebApiModule.forRoot(AppData, { delay: 1000 }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
