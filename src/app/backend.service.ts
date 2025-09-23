import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from './global-constants';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(protected http: HttpClient) {}

  public post(info: any = {}, url: any = GlobalConstants.URLNuevo) {
    return this.http.post(`${url}post.php`, info);
  }
}
