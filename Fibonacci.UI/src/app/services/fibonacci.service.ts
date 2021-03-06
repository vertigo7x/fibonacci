import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { FibonacciProxyService } from '../api/fibonacci.proxy.service';
import { FibonacciNumberDto } from '../model/fibonacciNumberDto';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class FibonacciService {

  private fibonacciNumbers$: Subject<FibonacciNumberDto[]> = new Subject<FibonacciNumberDto[]>();
  private fibonacciNumbers: FibonacciNumberDto[] = [];
  public fibonacciCalculating$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _fibonacciProxyService: FibonacciProxyService, private _notificationService: NotificationService) { }

  public getAllFibonacciNumbers(): void {
    this._fibonacciProxyService.apiFibonacciGetAllGet().subscribe({
      next: (response) => this.handleGetAllFibonacciNumbersResponse(response),
      error: (error) => this.handleGetAllFibonacciNumbersError(error)
    });
  }

  public calculateFibonacciNumber(sequenceIndex: number): void {
    this.fibonacciCalculating$.next(true);
    this._fibonacciProxyService.apiFibonacciCreatePost({
      requestDate: new Date(),
      sequenceIndex: sequenceIndex,
      status: '',
      message: ''
    }).subscribe({
      next: (response) => this.handleCalculateFibonacciNumberResponse(response),
      error: (error) => this.handleCalculateFibonacciNumberError(error)
    });
  }

  public getFibonacciNumbers(): Observable<FibonacciNumberDto[]> {
    return this.fibonacciNumbers$;
  }

  public getFibonacciCalculating(): Observable<boolean> {
    return this.fibonacciCalculating$;
  }


  private handleGetAllFibonacciNumbersResponse(result: FibonacciNumberDto[]): void {
    if (result.length > 0) {
      setTimeout(() => {
        this.fibonacciNumbers = result;
        this.fibonacciNumbers$.next(this.fibonacciNumbers);
      }, 2000);
    }
  }
  private handleCalculateFibonacciNumberResponse(result: FibonacciNumberDto): void {
    this.fibonacciCalculating$.next(false);
    this.fibonacciNumbers.push(result);
    this.fibonacciNumbers$.next(this.fibonacciNumbers);
    this._notificationService.showNotification('Fibonacci Number Calculated', 'OK');
  }

  private handleGetAllFibonacciNumbersError(error: any): void {
    this.fibonacciCalculating$.next(false);
    this._notificationService.showNotification('Error getting all Fibonacci numbers', 'DISMISS');
  }

  private handleCalculateFibonacciNumberError(error: any): void {
    this.fibonacciCalculating$.next(false);
    console.log(error);
    this._notificationService.showNotification(error.error.message, 'DISMISS');
  }
}
