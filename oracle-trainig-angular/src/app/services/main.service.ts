import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MainService {
  public baseURL = "http://localhost:3000";
  public httpOptionsPublic = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  public httpOptionsPrivate = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.getToken(),
    }),
  };
  constructor(private http: HttpClient) {}

  getToken() {
    return localStorage.getItem("token");
  }

  register(user) {
    return this.http
      .post(this.baseURL + "/api/auth/register", user, this.httpOptionsPublic)
      .pipe(catchError(this.handleError("register")));
  }

  login(user) {
    return this.http
      .post(this.baseURL + "/api/auth/login", user, this.httpOptionsPublic)
      .pipe(
        tap((res: any) => {
          if (res && res.token) {
            localStorage.setItem("token", res.token);
          }
        }),
        catchError(this.handleError("login"))
      );
  }

  getAllUsers() {
    return this.http
      .get(this.baseURL + "/api/users", this.httpOptionsPrivate)
      .pipe(catchError(this.handleError("getAllUsers")));
  }

  getAllTasksForUser(id, search) {
    return this.http
      .get(
        this.baseURL + `/api/tasks?userID=${id}&search=${search}`,
        this.httpOptionsPrivate
      )
      .pipe(catchError(this.handleError("getAllTasksForUser")));
  }

  updateTask(task) {
    return this.http
      .post(this.baseURL + "/api/editTask", task, this.httpOptionsPrivate)
      .pipe(catchError(this.handleError("updateTask")));
  }

  deleteTask(task) {
    return this.http
      .post(this.baseURL + "/api/deleteTask", task, this.httpOptionsPrivate)
      .pipe(catchError(this.handleError("deleteTask")));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      if (error.status === 401) {
        //redirect user to login page
      }
      return of(result as T);
    };
  }
}
