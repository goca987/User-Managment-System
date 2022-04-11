import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  apiUrl : string ="http://localhost:3000"

  postUser(data : any) {
    return this.http.post<any>(this.apiUrl + "/userList/", data);
  }

  getUser() {
    return this.http.get<any>(this.apiUrl + "/userList/");
  }

  getUserById(id: number) {
    return this.http.get<any>(this.apiUrl + "/userList/" + id);
  }

  putUser(data: any, id: number) {
    return this.http.put<any>(this.apiUrl + "/userList/" + id, data);
  }

  deleteUser(id: number) {
    return this.http.delete<any>(this.apiUrl + "/userList/" + id);
  }

  getPermission()
  {
    return this.http.get<any>(this.apiUrl + "/permissionList/");
  }

}
