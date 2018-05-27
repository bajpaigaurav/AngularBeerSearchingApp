import { beerDetails } from './../interfaces/beer-details';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Observer } from "rxjs/Rx"
import "rxjs/add/operator/catch"
import "rxjs/add/observable/throw"
import "rxjs/add/operator/map"

@Injectable()
export class GetBeerDetailsService {


  beerBottleURL : string = 'http://starlord.hackerearth.com/beercraft';

  constructor(private http: HttpClient) { }
  
  getBeerBottles(): Observable<beerDetails[]> {
    return Observable.create((observer: Observer<beerDetails[]>) => {
      return this.http.get(this.beerBottleURL)
        .map((res) => {
          return res
        }).catch((res: any) => {
          observer.error({
            // any error handling should go here
          })
          return res
        })
        .subscribe((serverData: beerDetails[]) => {
          if (serverData) {
            observer.next(serverData)
            observer.complete();
          } else {
            observer.error(serverData)
          }
        });
    });
  }


}


