import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  eventList = {
    id: 1,
    name: 'Gianna Stickel'
  }

  handleEventClicked(xdata: string){
    console.log('received', xdata);
  }


  constructor() { }

  ngOnInit(): void {
  }

}
