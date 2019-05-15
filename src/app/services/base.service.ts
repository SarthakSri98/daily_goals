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
    return this.http.post<{message:string , result:{} , isAuthenticated:Boolean, token:string }>('/users/login',data);
  }

  signup(data)
  {
    console.log(data);
        return this.http.post<{message:string , result:{} }>('/users/signup',data);
  }

  postTasks(data)
  {
    return this.http.post('/catalog/task',data);
  }

  editTasks(data)
  {
    return this.http.put('/catalog/task',data);
  }

  getTasks()
  {
    return this.http.get<{ error:any , result:any }>('/catalog/task');
  }

  deleteTasks()
  {
    return this.http.delete<{ message:any , result:any }>('/catalog/task');

  }

  postTaskStatus(data)
  {
    return this.http.post<{}>('/catalog/taskStatus',data);
  }

  getTaskStatus()
  {
    return this.http.get<{message:string, data:any}>('/catalog/getTaskStatuses');
  }

}
