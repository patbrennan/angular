// NOTE: Some methods were depracated in Ng6, but may still work. See future
// http lectures for details on Ng6 http functionality.
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";

import { map, catchError } from "rxjs/operators"; // Ng6 syntax
import { throwError } from "rxjs";


@Injectable() // required to inject a service into a service
export class ServersService {
  constructor(private http: Http) {}
  
  storeServers(servers: any[]) { // won't send request. Must subscribe to it.
    const headers = new Headers({ // to pass headers in http request
      "Content-Type": "application/json", // default anyway; not really necessary
    });
    
    // return this.http.post( // this returns an observable
    //   // data.json required for firebase
    //   "https://ng-http-2018.firebaseio.com/data.json",
    //   servers,
    //   {headers: headers} // pass headers to http requests
    // );
    
    return this.http.put( // using put w/Firebase will overwrite existing data
      "https://ng-http-2018.firebaseio.com/data.json",
      servers,
      {headers: headers}
    );
  }
  
  getServers() {
    return this.http.get("https://ng-http-2018.firebaseio.com/data") // error
      .pipe( // used to take operators
        map( // takes data received from Obs & transforms it/wraps w/another Obs
          (response: Response) => {
            const data = response.json();
            
            for (const server of data) {
              if (!server.name.startsWith("FETCHED_")) {
                server.name = "FETCHED_" + server.name;
              }
            }
            return data;
          }
        ),
        catchError( // won't wrap return data with Obs automatically
          (error: Response) => {
            return throwError("Something Went Wrong!"); // wraps the error w/Observable
          }
        )
      );
    // optionally takes object to configure request
  }
  
  getAppName() {
    return this.http.get("https://ng-http-2018.firebaseio.com/appName.json")
    .pipe(
      map(
        (response: Response) => {
          return response.json();
        }
      )
    );
  }
}