import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GithubService {
private username;


  constructor(private http:HttpClient) {
    this.username='bradtraversy'
   }

  getProfile(term:string):Observable<any>{
    return this.http.get(`https://api.github.com/users/${term}`);
  }
  getRepos(term:string):Observable<any>{
return this.http.get(`https://api.github.com/users/${term}/repos`);
  }
}
