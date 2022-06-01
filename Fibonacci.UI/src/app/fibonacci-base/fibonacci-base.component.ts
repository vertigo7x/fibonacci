import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { FibonacciNumberDto } from '../model/fibonacciNumberDto';
import { FibonacciService } from '../services/fibonacci.service';

@Component({
  template: '',
})
export class FibonacciBaseComponent implements OnDestroy {

  private _subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor() { }

  ngOnDestroy(): void {
   this._subscriptions.forEach(s => s.unsubscribe());
  }

  public addSubscription(subscription: Subscription): void {
    this._subscriptions.push(subscription);
  }

  public get subscriptions(): Array<Subscription> {
    return this._subscriptions;
  }

  public getSubscription(subscription: Subscription): Subscription | undefined {
    return this._subscriptions.find(s => s === subscription);
  }

  public deleteSubscription(subscription: Subscription): void {
    const index = this._subscriptions.indexOf(subscription);
    if (index > -1) {
      this._subscriptions.splice(index, 1);
    }
  }
}