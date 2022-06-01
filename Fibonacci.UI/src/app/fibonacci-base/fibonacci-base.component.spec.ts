import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { Subscription } from 'rxjs/internal/Subscription';
import { FibonacciBaseComponent } from './fibonacci-base.component';

describe('FibonacciBaseComponent', () => {
  let component: FibonacciBaseComponent;
  let fixture: ComponentFixture<FibonacciBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FibonacciBaseComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FibonacciBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add subscriptions to _subscriptions array', () => {
    let sub = new Subscription();
    component.addSubscription(sub);
    expect(component.subscriptions.length).toBe(1);
  });

  it('should get subscription from _subscriptions array', () => {
    let sub = new Subscription();
    component.addSubscription(sub);
    expect(component.subscriptions.length).toBe(1);
    expect(component.getSubscription(sub)).toBe(sub);
  });

  it('should delete subscriptions from _subscriptions array', () => {
    let sub = new Subscription();
    component.addSubscription(sub);
    component.deleteSubscription(sub);
    expect(component.subscriptions.length).toBe(0);
  });
});
