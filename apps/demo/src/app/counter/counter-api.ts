import { type Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export class CounterApi {
  public increaseBy$(amount: number, count: number): Observable<CounterApiResponse> {
    if (amount > 0 && count >= 5) {
      return throwError(() => new RangeError('Count is too high'));
    }

    if (amount < 0 && count <= 0) {
      return throwError(() => new RangeError('Count is too low'));
    }

    return of({ count: count + amount }).pipe(delay(250));
  }
}

export interface CounterApiResponse {
  count: number;
}
