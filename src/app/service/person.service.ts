import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Person } from '../interface/Person.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpClient: HttpClient) { }

  getAll():Observable<Person[]>{
    return this.httpClient.get<Person[]>(`${environment.apiUrl}/Person/GetAll`);
   }

  deletePerson(id:number):Observable<void>{
    return this.httpClient.delete<void>(`${environment.apiUrl}/Person/delete/${id}`);
  }

  getById(id:number): Observable<Person>{
    return this.httpClient.get<Person>(`${environment.apiUrl}/Person/GetById/${id}`);
  }

  addPerson(person: Person): Observable<Person>{
    return this.httpClient.post<Person>(`${environment.apiUrl}/Person/Add`,person);
  }

  updatePerson(id: number, person: Person): Observable<void>{
    return this.httpClient.put<void>(`${environment.apiUrl}/Person/Update/${id}`,person);
  }
}
