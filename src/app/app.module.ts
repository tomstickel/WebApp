import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventsComponent } from './events/events.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventthumbnailComponent } from './eventthumbnail/eventthumbnail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventsComponent,
    EventsListComponent,
    EventthumbnailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
