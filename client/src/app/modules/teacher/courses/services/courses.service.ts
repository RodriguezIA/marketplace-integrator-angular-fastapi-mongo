import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap, map, Observable, switchMap, of, throwError } from 'rxjs';
import { Course } from 'app/modules/user/courses/interfaces/courses.interface';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private _courses: BehaviorSubject<Course[] | null> = new BehaviorSubject(null);
  private _course: BehaviorSubject<Course | null> = new BehaviorSubject(null);

  /**
     * Getter for courses
     */
  get courses$(): Observable<Course[]>
  {
      return this._courses.asObservable();
  }

  /**
     * Getter for course
     */
  get course$(): Observable<Course>
  {
      return this._course.asObservable();
  }

  /**
     * Get courses
     */
  getCourses(): Observable<Course[]>
  {
      return this._httpClient.get<Course[]>('api/apps/courses/teacher').pipe(
          tap((response: any) => {
              this._courses.next(response);
          })
      );
  }

  /**
     * Get course by id
     */
  getCourseById(id: string): Observable<Course>
  {
      return this._httpClient.get<Course>('api/apps/courses/teacher/course', {params: {id}}).pipe(
          map((course) => {

              // Update the course
              this._course.next(course);

              // Return the course
              return course;
          }),
          switchMap((course) => {

              if ( !course )
              {
                  const err = new Error('Could not found course with id of ' + id + '!');
                  return throwError(() => err);
              }

              return of(course);
          })
      );
  }

  createCourse() : Observable<Course>{
    return this.getCourseById('new');
  }

  constructor(private _httpClient: HttpClient){}
}
