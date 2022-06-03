import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  const matSnackBarSpy: any = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: matSnackBarSpy }],
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('showNotification should call open method of MatSnackBar', () => {
    service.showNotification('message', 'action', 3000);
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('showNotification should call open method of MatSnackBar without timeout', () => {
    service.showNotification('message', 'action');
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });
});
