import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { FibonacciNumberDto } from '../model/fibonacciNumberDto';
import { FibonacciService } from '../services/fibonacci.service';
import { FibonacciListComponent } from './fibonacci-list.component';

describe('FibonacciListComponent', () => {
  let component: FibonacciListComponent;
  let fakeData: FibonacciNumberDto[] = [{
    sequenceIndex: 0,
    number: 0,
    requestDate: new Date(),
    status: '',
  }]
  let fixture: ComponentFixture<FibonacciListComponent>;
  let getFibonacciNumbersSpy: any;
  let getAllFibonacciNumbersSpy: any;
  const fibonacciServiceSpy = jasmine.createSpyObj<FibonacciService>(
    'FibonacciService',
    ['getFibonacciNumbers', 'getAllFibonacciNumbers'],
  );
  getFibonacciNumbersSpy = fibonacciServiceSpy.getFibonacciNumbers.and.returnValue(of(fakeData));
  getAllFibonacciNumbersSpy = fibonacciServiceSpy.getAllFibonacciNumbers();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FibonacciListComponent ],
      providers: [{ provide: FibonacciService, useValue: fibonacciServiceSpy }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FibonacciListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
