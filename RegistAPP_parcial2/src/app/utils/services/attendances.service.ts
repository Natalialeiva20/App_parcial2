import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendancesService {
    private baseUrl = 'http://localhost:3000/api'; // URL base de tu backend
  
    constructor(private http: HttpClient) {}
  
    getStudentSections(studentId: number): Observable<any[]> {
      console.log(`Fetching sections for student ID: ${studentId}`);
      return this.http.get<any[]>(`${this.baseUrl}/sections/student/${studentId}`);
    }

    getAttendancesByStudentAndSection(studentId: number, sectionId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/attendances/student/${studentId}/section/${sectionId}`);
      }
      
      registerAttendance(studentId: number, classId: string): Observable<any> {
        const body = {
          studentId: studentId,
          classId: classId
        };
        return this.http.post(`${this.baseUrl}/attendances`, body);
      }
    }
    
  
  