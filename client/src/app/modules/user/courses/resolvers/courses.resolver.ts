import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Course } from 'app/modules/user/courses/interfaces/courses.interface';
import { CoursesService } from '../services/courses.service';

@Injectable({
    providedIn: 'root'
})
export class CoursesResolver implements Resolve<any>{

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course[]> {
        return this._coursesService.getCourses();
    }

    constructor(private _coursesService: CoursesService) { }
}

@Injectable({
    providedIn: 'root'
})
export class CourseResolver implements Resolve<any>{

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
        return this._coursesService.getCourseById(route.paramMap.get('id'))
            .pipe(
                // Error here means the requested task is not available
                catchError((error) => {

                    // Log the error
                    console.error(error);

                    // Get the parent url
                    const parentUrl = state.url.split('/').slice(0, -1).join('/');

                    // Navigate to there
                    this._router.navigateByUrl(parentUrl);

                    // Throw an error
                    return throwError(error);
                })
            );
    }

    constructor(private _router: Router, private _coursesService: CoursesService) { }
}
