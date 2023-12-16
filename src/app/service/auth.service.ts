import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = " http://localhost:3000/users";
  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(this.apiUrl);
  }
  getUserById(id: any) {
    return this.http.get(this.apiUrl+"/"+id);
  }
  proceedRegisterUser(data: any) {
    return this.http.post(this.apiUrl, data);
  }
  updateUser(data: any, id: any) {
    return this.http.put(this.apiUrl + '/' + id, data);
  }
  isLoggedIn(): boolean{
    return sessionStorage.getItem('username') != null;
  }
  getUserRole(){
    return sessionStorage.getItem('userRole') != null ? sessionStorage.getItem('userRole') : '';
  }
  logOut(){
    sessionStorage.clear();
  }
}
