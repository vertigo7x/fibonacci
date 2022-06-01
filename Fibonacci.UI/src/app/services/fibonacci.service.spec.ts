import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';
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
  let apiFibonacciGetAllGetErrorSpy: any;
  let apiFibonacciCreatePostErrorSpy: any;

  const fibonacciProxyServiceSpy: any = jasmine.createSpyObj<FibonacciProxyService>('FibonacciProxyService',
    ['apiFibonacciGetAllGet', 'apiFibonacciCreatePost']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: FibonacciProxyService, useValue: fibonacciProxyServiceSpy }],
    });
    service = TestBed.inject(FibonacciService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getFibonacciNumbers should return an array of FibonacciNumberDto', () => {
    apiFibonacciCreatePostSpy = fibonacciProxyServiceSpy.apiFibonacciCreatePost.and.returnValue(of(fakeData));
    service.calculateFibonacciNumber(0);
    service.getFibonacciNumbers().subscribe((data) => {
      expect(data).toEqual(fakeDataArray);
    });
  });

  it('getFibonacciCalculating should return boolean => false', () => {
    apiFibonacciCreatePostSpy = fibonacciProxyServiceSpy.apiFibonacciCreatePost.and.returnValue(of(fakeData));
    service.calculateFibonacciNumber(0);
    service.getFibonacciCalculating().subscribe((data) => {
      expect(data).toEqual(false);
    });
  });

  it('calculateFibonacciNumber should add FibonacciNumberDto to getFibonacciNumbers', () => {
    apiFibonacciCreatePostSpy = fibonacciProxyServiceSpy.apiFibonacciCreatePost.and.returnValue(of(fakeData));
    service.calculateFibonacciNumber(0);
    service.getFibonacciNumbers().subscribe((data) => {
      expect(data).toEqual(fakeDataArray);
    });
  });

  it('getAllFibonacciNumbers should add FibonacciNumberDto[] to getFibonacciNumbers', () => {
    apiFibonacciGetAllGetSpy = fibonacciProxyServiceSpy.apiFibonacciGetAllGet.and.returnValue(of(fakeDataArray));
    service.getAllFibonacciNumbers();
    service.getFibonacciNumbers().subscribe((data) => {
      expect(data).toEqual(fakeDataArray);
    });
  });

  it('getAllFibonacciNumbers throws ramdom error', () => {
    apiFibonacciGetAllGetErrorSpy = fibonacciProxyServiceSpy.apiFibonacciGetAllGet.and.returnValue(throwError(() => {}));
    service.getAllFibonacciNumbers();
    service.getFibonacciCalculating().subscribe((data) => {
      expect(data).toEqual(false);
    });
  });

  it('calculateFibonacciNumber throws ramdom error', () => {
    apiFibonacciCreatePostErrorSpy = fibonacciProxyServiceSpy.apiFibonacciCreatePost.and.returnValue(throwError(() => {}));
    service.calculateFibonacciNumber(0);
    service.getFibonacciCalculating().subscribe((data) => {
      expect(data).toEqual(false);
    });
  });

});
