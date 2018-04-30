import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { User } from "../../model/user/user.model";
import { URLs } from "../../apiURLs/apiURLs.constants";
import { Task } from '../../model/task/task.model';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {
  urls = URLs;
  constructor(private http: HttpClient) {
  }
  addTask(task: Task) {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let body = {
                  user_id: user_id,
                  token: token,
                  method: this.urls.addTask,
                  data: task
                }
        return this.http.post(this.urls.root, JSON.stringify(body));
  }

  getTask(flag: number) {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let body: string = `method=${this.urls.getTasks}&user_id=${user_id}&token=${token}&flag=${flag}`;
    return this.http.post(this.urls.root, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  getAllTask() {
    return this.getTask(-1);
  }
  getCompletedTask() {
    return this.getTask(1);
  }
  getPendingTask() {
    return this.getTask(0);
  }

  markComplete(task_id: number) {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let body: string = `method=${this.urls.markTaskComplete}&user_id=${user_id}&token=${token}&task_id=${task_id}`;
    return this.http.post(this.urls.root, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  deleteTask(task_id: number) {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let body: string = `method=${this.urls.deleteTask}&user_id=${user_id}&token=${token}&task_id=${task_id}`;
    return this.http.post(this.urls.root, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  editTask(task: Task) {
    let user_id = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');
    let body = {
                  user_id: user_id,
                  token: token,
                  method: this.urls.editTask,
                  data: task
                }
        return this.http.post(this.urls.root, JSON.stringify(body));
  }

}
