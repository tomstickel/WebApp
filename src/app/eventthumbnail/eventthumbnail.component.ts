import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventthumbnail',
  //templateUrl: './eventthumbnail.component.html',
  template: ` <h2>{{eventInput.name}}</h2>`,
  styleUrls: ['./eventthumbnail.component.css']
})
export class EventthumbnailComponent implements OnInit {

  // This input decorator tells angular this will be passed in from
  // another component
  @Input()  eventInput: any;

  constructor() { }

  ngOnInit(): void {
  }

}
