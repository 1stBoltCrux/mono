import { Injectable, HostListener } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  public resize$ = fromEvent(window, 'resize')
    .pipe(
      debounceTime(150),
      map((e: any) => {
        return e.target.innerWidth;
      })
  )

  constructor() { }
}
