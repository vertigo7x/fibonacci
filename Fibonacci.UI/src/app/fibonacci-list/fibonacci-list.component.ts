import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor(private _fibonacciService: FibonacciService) { super(); }

  ngOnInit(): void {
    // Put placeholder data in the table
    this.createFibonacciTablePlaceholder();
    // Get All Fibonacci Numbers
    this._fibonacciService.getAllFibonacciNumbers();
    // Get Fibonacci Numbers Observable
    this.addSubscription(this._fibonacciService.getFibonacciNumbers().subscribe(fn => {
      this.fibonacciNumbers = new MatTableDataSource(fn);
      this.fibonacciNumbers.paginator = this.paginator;
    }));
  }


  private createFibonacciTablePlaceholder(): void {
    let v:FibonacciNumberDto[] = []; 
    for (var i = 0; i < this.PLACEHOLDER_AMMOUNT; i++) { 
      v.push({ 
        'sequenceIndex': -1,
        'number': -1, 
        'requestDate': new Date(), 
        'status': 'placeholder' 
      });
    } 
    this.fibonacciNumbers.data = v;
  }
}
