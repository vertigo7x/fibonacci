import { Component } from '@angular/core';
import { FibonacciService } from './api/fibonacci.service';
import { FibonacciNumberDto } from './model/fibonacciNumberDto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [FibonacciService]
})
export class AppComponent {
  title = 'Fibonacci.UI';

  public fibonacciNumbers: FibonacciNumberDto[] = [];
  public sequenceIndex: number = 0;

  constructor(private _fibonacciService: FibonacciService) {
  }

  ngOnInit() {
    this._fibonacciService.apiFibonacciGetAllGet().subscribe((response) => {
      this.fibonacciNumbers = response;
    })
  }

  clickCalculateFibonacciNumber() {
    if (this.sequenceIndex <= 1) {
      alert('Please type a number bigger than 1.');
    } else {
      this._fibonacciService.apiFibonacciCreatePost({
        requestDate: new Date(),
        sequenceIndex: this.sequenceIndex,
        status: '',
        message: ''
      }).subscribe((result)=> {
        if (result.message != '') {
          this.fibonacciNumbers.push(result);
        }
      }, (errorResponse) => {
        alert(`${errorResponse.error.message} - Value: ${errorResponse.error.number}`)
      })
    }
  }
}
