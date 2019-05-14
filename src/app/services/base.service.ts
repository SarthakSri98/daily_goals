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
    return this.http.post<{message:string , result:{} , isAuthenticated:Boolean, token:string }>('http://localhost:8000/users/login',data);
  }

  signup(data)
  {
    console.log(data);
        return this.http.post<{message:string , result:{} }>('http://localhost:8000/users/signup',data);
  }

  postTasks(data)
  {
    return this.http.post('http://localhost:8000/catalog/task',data);
  }

  editTasks(data)
  {
    return this.http.put('http://localhost:8000/catalog/task',data);
  }

  getTasks()
  {
    return this.http.get<{ error:any , result:any }>('http://localhost:8000/catalog/task');
  }

  deleteTasks()
  {
    return this.http.delete<{ message:any , result:any }>('http://localhost:8000/catalog/task');

  }

  postTaskStatus(data)
  {
    return this.http.post<{}>('http://localhost:8000/catalog/taskStatus',data);
  }

  getTaskStatus()
  {
    return this.http.get<{message:string, data:any}>('http://localhost:8000/catalog/getTaskStatuses');
  }

}
