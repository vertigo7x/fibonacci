import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { FibonacciBaseComponent } from '../fibonacci-base/fibonacci-base.component';
import { FibonacciNumberDto } from '../model/fibonacciNumberDto';
import { FibonacciService } from '../services/fibonacci.service';

@Component({
  selector: 'app-fibonacci-list',
  templateUrl: './fibonacci-list.component.html',
  styleUrls: ['./fibonacci-list.component.scss']
})
export class FibonacciListComponent extends FibonacciBaseComponent implements OnInit, OnDestroy {

  private PLACEHOLDER_AMMOUNT:number = 10;
  public displayedColumns: string[] = ['sequenceIndex', 'number', 'requestDate', 'status'];
  public fibonacciNumbers: MatTableDataSource<FibonacciNumberDto> = new MatTableDataSource<FibonacciNumberDto>();

  constructor(private _fibonacciService: FibonacciService) { super(); }

  ngOnInit(): void {
    // Put placeholder data in the table
    this.createFibonacciTablePlaceholder();
    // Get All Fibonacci Numbers
    this._fibonacciService.getAllFibonacciNumbers();
    // Get Fibonacci Numbers Observable
    this.addSubscription(this._fibonacciService.getFibonacciNumbers().subscribe(fn => {
      this.fibonacciNumbers = new MatTableDataSource(fn);
    }));
  }

  createFibonacciTablePlaceholder(): void {
    let v = []; 
    for (var i = 0; i < this.PLACEHOLDER_AMMOUNT; i++) { 
      v.push({ 
        'sequenceIndex': 0,
        'number': 0, 
        'requestDate': new Date(), 
        'status': '' 
      }) 
    } 
    this.fibonacciNumbers.data = v;
  }
}
