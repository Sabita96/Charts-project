import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  constructor() { }

  showLoader(): void {
    this.isLoadingSubject.next(true);
  }
  hideLoader(): void {
    setTimeout(() => {
      this.isLoadingSubject.next(false);

    }, 500)
  }


}
