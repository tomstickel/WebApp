import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'events', component: EventsComponent},
  {path : 'main', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
