import { Course } from './../interfaces/courses.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private _courses: BehaviorSubject<Course[] | null> = new BehaviorSubject(null);

  /**
     * Getter for courses
     */
  get courses$(): Observable<Course[]>
  {
      return this._courses.asObservable();
  }

  /**
     * Get courses
     */
  getCourses(): Observable<Course[]>
  {
    console.log('called from coursesServices');
      return this._httpClient.get<Course[]>('api/apps/courses/user').pipe(
          tap((response: any) => {
              this._courses.next(response);
          })
      );
  }

  constructor(private _httpClient: HttpClient){}
}
