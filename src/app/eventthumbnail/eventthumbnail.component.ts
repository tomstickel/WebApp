import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-eventthumbnail',
  templateUrl: './eventthumbnail.component.html',
  //template: ` <h2>{{eventInput.name}}</h2>`,
  styleUrls: ['./eventthumbnail.component.css']
})
export class EventthumbnailComponent implements OnInit {

  // This input decorator tells angular this will be passed in from
  // another component
  @Input()  eventInput: any;

  // output decorator to talk to parent
  @Output() eventClick = new EventEmitter();

  handleClickMe(){
    //console.log('click');
    this.eventClick.emit(this.eventInput.name);
  }


  constructor() { }

  ngOnInit(): void {
  }

}
