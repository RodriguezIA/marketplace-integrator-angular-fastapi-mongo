import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Course } from 'app/modules/user/courses/interfaces/courses.interface'; 
import { CoursesService } from '../services/courses.service';

@Injectable({
    providedIn: 'root'
})
export class CoursesResolver implements Resolve<any>{

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course[]>{
        return this._coursesService.getCourses();
    }

    constructor(private _coursesService: CoursesService){}
}