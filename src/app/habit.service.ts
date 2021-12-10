import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Habit } from './habit';

@Injectable({
  providedIn: 'root',
})
export class HabitService {
  habits: Habit[] = [];
  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json' )
    .set('Authorization', 'Bearer ' + localStorage.getItem('access_token') )
    .set('test01', 'testdddd')
  };
  constructor(private http: HttpClient) {}

  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>('/api/habits',this.httpOptions);
  }

  addHabit(newHabit: any) {
    const id = this.habits.length + 1;
    newHabit.id = id;
    this.habits.push(newHabit);
  }
}
