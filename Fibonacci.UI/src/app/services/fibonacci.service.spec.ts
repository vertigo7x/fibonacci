import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { FibonacciProxyService } from '../api/fibonacci.proxy.service';
import { FibonacciNumberDto } from '../model/fibonacciNumberDto';

import { FibonacciService } from './fibonacci.service';

describe('FibonacciService', () => {
  let service: FibonacciService;
  let fakeData: FibonacciNumberDto = {
    sequenceIndex: 0,
    number: 0,
    requestDate: new Date(),
    status: '',
    message: 'New Fibonacci number',
  };
  let fakeDataArray: FibonacciNumberDto[] = [fakeData];
  let apiFibonacciGetAllGetSpy: any;
  let apiFibonacciCreatePostSpy: any;

  const fibonacciProxyServiceSpy: any = jasmine.createSpyObj<FibonacciProxyService>('FibonacciProxyService', 
  ['apiFibonacciGetAllGet', 'apiFibonacciCreatePost']);
  apiFibonacciGetAllGetSpy = fibonacciProxyServiceSpy.apiFibonacciGetAllGet.and.returnValue(of(fakeDataArray));
  apiFibonacciCreatePostSpy = fibonacciProxyServiceSpy.apiFibonacciCreatePost.and.returnValue(of(fakeData));


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: FibonacciProxyService, useValue: fibonacciProxyServiceSpy }],
    });
    service = TestBed.inject(FibonacciService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
