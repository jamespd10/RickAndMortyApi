import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CharacterI } from '../interfaces/character.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  private url: string = 'https://rickandmortyapi.com/api/character';


  getAll(page: number): Observable<CharacterI> {
    return this.http.get<CharacterI>(`${this.url}/?page=${page}`);
  }

  getCharacter(id: string): Observable<CharacterI> {
    return this.http.get<CharacterI>(`${this.url}/${id}`);
  }
}
