import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    of(2, 4, 6, 8).subscribe(console.log);
    // of  - it automatically unsubscribes 
    // observable stream emits these 4 numbers

    from([20, 15, 10, 5]).subscribe(
      item => console.log(`resulting item .. ${item}`),
      err => console.error(`error occurred ${err}`),
      () => console.log('complete')
    );


    of('apple1', 'apple2', 'apple3')
      .subscribe(
        apple => console.log(`apple was emitted ${apple}`),
        err => console.error(`error: ${err}`),
        () => console.log(`no more apples`)
      );

        // RxJS 

        // of  ( source observable )
        // pipe  ( is method used on the observable)
        // subscribe   ( when we subscribe the source observable stream starts emitting items)
        // each item is piped through a series of operators in sequence

        // of(2, 4, 6)  means the 2 is first emitted and passed through each operator
        
        of(2, 4, 6)
          .pipe(
            map(item => item * 2),   // 2x2 = 4 ,   so  4, 8, 12  
            tap(item => console.log(item)),
            take(2)  // only emit the first two items, so  2, 4
          ).subscribe(console.log);


            // Marble diagram 
            // 2   4  6
            // 4   8  12 
            // map is a transformation operator  (its a function)
            // map takes in an input stream , subscribes 
            // it creates an output stream
            // when an item is emitted 
            // it is transformed as specified by the provided function 
            // item is emitted to the output stream 

            // Tap  is for debugging and perform actions outside of the flow of data
            // input observable is identical to its output observable 





  }

}
