import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UIStateService {
  darkModeState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}
}
