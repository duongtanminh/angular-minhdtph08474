import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
const apiUrl = "https://5e8003ce0eb3ec0016e90e72.mockapi.io/motels";

@Injectable()
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudentByMotelId(motelId, studentId): Observable<any> {
    let api = `${apiUrl}/${motelId}/students/${studentId}`;
    return this.http.get<any>(api);
  }
  getStudentsByMotelId(motelId): Observable<any> {
    let api = `${apiUrl}/${motelId}/students`;
    return this.http.get<any>(api);
  }
  getDetailStudent(motelId, studentId): Observable<any> {
    let api = `${apiUrl}/${motelId}/students/${studentId}`;
    return this.http.get<any>(api);
  }
  removeStudent(motelId, studentId): Observable<any> {
    let url = `${apiUrl}/${motelId}/students/${studentId}`;
    return this.http.delete<any>(url);
  }
  addStudent(StudentObject): Observable<any> {
    let url = `${apiUrl}/${StudentObject.motelId}/students`;
    return this.http.post<any>(url, StudentObject);
  }
  updateStudent(studentObject): Observable<any> {
    let api = `${apiUrl}/${studentObject.motelId}/students/${studentObject.id}`;
    return this.http.put<any>(api, studentObject);
  }
}