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

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('form shouldnt be valid if input is empty', () => {
    component.fibonacciForm.controls['sequenceIndex'].setValue('');
    fixture.detectChanges();
    component.clickCalculateFibonacciNumber();
    expect(component.fibonacciForm.valid).toBe(false);
  });

  it('form should be valid if input is with value', () => {
    component.fibonacciForm.controls['sequenceIndex'].setValue(55);
    fixture.detectChanges();
    let matError = fixture.debugElement.nativeElement.querySelector('mat-error');
    expect(component.fibonacciForm.valid).toBe(true);
    expect(matError).toBe(null);
  });

  it('validator returns error if value is 1 with message: Please type a number bigger than 1.', () => {
    component.fibonacciForm.controls['sequenceIndex'].setValue(1);
    fixture.detectChanges();
    let matError = fixture.debugElement.nativeElement.querySelector('mat-error');
    expect(component.fibonacciForm.valid).toBe(false);
    expect(matError.textContent).toContain('Please type a number bigger than 1.');
  });

  it('validator returns error if value is 1234567 with message: Please type a number less than 5 digits.', () => {
    component.fibonacciForm.controls['sequenceIndex'].setValue(1234567);
    fixture.detectChanges();
    let matError = fixture.debugElement.nativeElement.querySelector('mat-error');
    expect(component.fibonacciForm.valid).toBe(false);
    expect(matError.textContent).toContain('Please type a number less than 5 digits.');
  });

  it('validator returns error if value is empty with message: Please type at least 1 number bigger than 1.', () => {
    component.fibonacciForm.controls['sequenceIndex'].setValue(null);
    fixture.detectChanges();
    let matError = fixture.debugElement.nativeElement.querySelector('mat-error');
    expect(component.fibonacciForm.valid).toBe(false);
    expect(matError.textContent).toContain('Please type at least 1 number bigger than 1.');
  });

  it('validator returns error if value is null with message: Please type only numbers.', () => {
    component.fibonacciForm.controls['sequenceIndex'].setValue('a');
    fixture.detectChanges();
    let matError = fixture.debugElement.nativeElement.querySelector('mat-error');
    expect(component.fibonacciForm.valid).toBe(false);
    expect(matError.textContent).toContain('Please type only numbers.');
  });

  it('form should be processed with correct value', () => {
    component.fibonacciForm.controls['sequenceIndex'].setValue(55);
    fixture.detectChanges();
    component.clickCalculateFibonacciNumber();
    expect(component.fibonacciForm.valid).toBe(true);
    expect(fibonacciServiceSpy.getFibonacciCalculating).toHaveBeenCalled();
  });

});
