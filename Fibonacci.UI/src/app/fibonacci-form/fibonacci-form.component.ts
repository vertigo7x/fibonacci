import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FibonacciBaseComponent } from '../fibonacci-base/fibonacci-base.component';
import { FibonacciService } from '../services/fibonacci.service';
import { sequenceIndexValidator } from './validators/sequence-index.validator';

@Component({
  selector: 'app-fibonacci-form',
  templateUrl: './fibonacci-form.component.html',
  styleUrls: ['./fibonacci-form.component.scss']
})
export class FibonacciFormComponent extends FibonacciBaseComponent implements OnInit {

  public loading: boolean = true;
  public fibonacciForm: FormGroup = this._fb.group({});;

  constructor(private _fibonacciService: FibonacciService, private _fb: FormBuilder) { 
    super(); 
    this.initFibonacciForm();
  }

  ngOnInit(): void {
    this.addSubscription(this._fibonacciService.getFibonacciCalculating().subscribe(loading => {
      this.loading = loading;
    }));
  }

  initFibonacciForm() {
      this.fibonacciForm = this._fb.group({
        sequenceIndex: [[0], [Validators.required, Validators.maxLength(5), Validators.pattern('^[0-9]*$'), sequenceIndexValidator()]]
      });
  }

  clickCalculateFibonacciNumber() {
    if (this.fibonacciForm.valid) {
      let sequenceIndex = this.fibonacciForm.get('sequenceIndex')?.value;
      this._fibonacciService.calculateFibonacciNumber(sequenceIndex);
    }
  }

  getErrorMessage(): string {
    if (this.fibonacciForm.get('sequenceIndex')?.hasError('sequenceIndex')) {
      return this.fibonacciForm.get('sequenceIndex')?.getError('sequenceIndex')?.message;
    } else if (this.fibonacciForm.get('sequenceIndex')?.hasError('required')) {
      return 'Please type at least 1 number bigger than 1.';
    } else if (this.fibonacciForm.get('sequenceIndex')?.hasError('pattern')) {
      return 'Please type only numbers.';
    } else {
      return '';
    }
  }

}
