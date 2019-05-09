import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  isAuthenticated=false;
  constructor(private http: HttpClient) { }

  login(data)
  {
    return this.http.post<{message:string , result:{} , isAuthenticated:Boolean, token:string }>('users/login',data);
  }

  signup(data)
  {
    return this.http.post<{message:string , result:{} }>('users/signup',data);
  }
}
