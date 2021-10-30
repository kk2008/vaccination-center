import { Injectable } from '@angular/core';

import { ApiBackEndService } from '../services/api-back-end.service';

@Injectable({
  providedIn: 'root'
})
export class ApiFrontEndService {

  constructor(
    private ApiBackEndService: ApiBackEndService,
  ) { }

  public to(path, data?, data2?) {
    return new Promise<any>((resolve, reject) => {
      this.ApiBackEndService[path](data, data2).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject(err)
        }
      );
    });
  }
}
