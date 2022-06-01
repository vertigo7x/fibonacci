import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs/internal/observable/of';
import { FibonacciNumberDto } from '../model/fibonacciNumberDto';
import { FibonacciService } from '../services/fibonacci.service';
import { FibonacciFormComponent } from './fibonacci-form.component';

describe('FibonacciFormComponent', () => {
  let component: FibonacciFormComponent;
  let fixture: ComponentFixture<FibonacciFormComponent>;
  let fakeData: FibonacciNumberDto = {
    sequenceIndex: 0,
    number: 0,
    requestDate: new Date(),
    status: '',
  };
  let calculateFibonacciNumberSpy: any;
  let getFibonacciCalculatingSpy: any;
  const fibonacciServiceSpy = jasmine.createSpyObj<FibonacciService>(
    'FibonacciService',
    ['calculateFibonacciNumber', 'getFibonacciCalculating'],
  );
  calculateFibonacciNumberSpy = fibonacciServiceSpy.calculateFibonacciNumber(0);
  getFibonacciCalculatingSpy = fibonacciServiceSpy.getFibonacciCalculating.and.returnValue(of(true));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FibonacciFormComponent],
      providers: [FormBuilder, { provide: FibonacciService, useValue: fibonacciServiceSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FibonacciFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
