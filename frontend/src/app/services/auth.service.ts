import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders,HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { map, catchError, retry } from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  users: any=[];
  helper = new JwtHelperService();

  userUrl:string = 'http://localhost:3000/users';
  hrUrl:String = 'http://localhost:3000/hr';

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http:HttpClient) { }

  // Candidate registraction
  registerUser(user): Observable<any> {
    let url= `${this.userUrl}/register/`
    //console.log(user)
    return this.http.post(url, user,{headers:this.headers} ).pipe(catchError(this.errorMgmt))
  }

  // Company registraction
  registerCompany(company): Observable<any> {
    let url= `${this.hrUrl}/register/`
    return this.http.post(url, company,{headers:this.headers} ).pipe(catchError(this.errorMgmt))
  }

  // Authenfication of a user
  loginUser(user): Observable<any> {
    let url= `${this.userUrl}/login/`
    return this.http.post(url, user,{headers:this.headers} ).pipe(catchError(this.errorMgmt))
  }

  // Get applications from applied candidates
  createNewVacancy(data): Observable<any> {
    let url= `${this.hrUrl}/post/create/`
    return this.http.post(url, data, {headers:this.headers} ).pipe(catchError(this.errorMgmt))
  }

  // Get applications from applied candidates
  getApplications(hr): Observable<any> {
    let url= `${this.hrUrl}/get/applications/${hr}`
    return this.http.get(url, {headers:this.headers} ).pipe(catchError(this.errorMgmt))
  }

  // Get vacancy post 
  getVacancyPost(id): Observable<any> {
    let url= `${this.hrUrl}/get/vacancy/${id}`
    return this.http.get(url, {headers:this.headers} ).pipe(catchError(this.errorMgmt))
  }

  // apply for a job post
  applyVacancyPost(data): Observable<any> {
    let url= `${this.userUrl}/request`
    return this.http.post(url, data,{headers:this.headers} ).pipe(catchError(this.errorMgmt))
  }

  // get applied job for a user
  appliedPost(uid): Observable<any> {
    let url= `${this.userUrl}/request/${uid}`
    return this.http.get(url,{headers:this.headers} ).pipe(catchError(this.errorMgmt))
  }
  // Get vacancy post 
  getUserSuggestionPost(data): Observable<any> {
    let url= `${this.userUrl}/jobs`
    return this.http.post(url, data,{headers:this.headers} ).pipe(catchError(this.errorMgmt))
  }

  
  getSuggestionPost(): Observable<any> {
    let url= `${this.userUrl}/all/jobs`
    return this.http.get(url,{headers:this.headers} ).pipe(catchError(this.errorMgmt))
  }

  deleteVacancyPost(id): Observable<any> {
    let url= `${this.hrUrl}/post/delete/${id}`
    return this.http.delete(url, {headers:this.headers} ).pipe(catchError(this.errorMgmt))
  }
  
  updateSkill(data,id): Observable<any> {
    let url= `${this.userUrl}/profile/${id}`
    return this.http.put(url,data,{headers:this.headers} ).pipe(catchError(this.errorMgmt))
  }

  updateUser(user){
    localStorage.setItem('user', JSON.stringify(user))
    this.user = user
  }
  //Set token
  storeUserToken(token, user){
    localStorage.setItem('access_token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token
    this.user = user
  }

  //logout
  logout() {
    this.authToken= null;
    localStorage.clear();
  }

  // Nav bar component hide
  loggedIn(){
    let isToken=localStorage.getItem('access_token');
    return this.helper.isTokenExpired(isToken);
  }


  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
