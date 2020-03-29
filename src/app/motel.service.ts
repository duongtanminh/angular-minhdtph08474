import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
const apiUrl = "https://5e8003ce0eb3ec0016e90e72.mockapi.io/motels";
@Injectable()
export class MotelService {

  constructor(private http:HttpClient) { }
  getMotels(): Observable<any> {
    return this.http.get<any>(apiUrl);
  }
  getMotelById(motelId): Observable<any> {
    let url = `${apiUrl}/${motelId}`;
    return this.http.get<any>(url);
  }
  removeMotelById(motelId): Observable<any> {
    let url = `${apiUrl}/${motelId}`;
    return this.http.delete<any>(url);
  }
  addNewMotel(Motel):Observable<any>{
    return this.http.post<any>(apiUrl,Motel);
  }
  updateMotel(Motel):Observable<any>{
    let url =`${apiUrl}/${Motel.id}`;
    return this.http.put<any>(url,Motel);
  }
}