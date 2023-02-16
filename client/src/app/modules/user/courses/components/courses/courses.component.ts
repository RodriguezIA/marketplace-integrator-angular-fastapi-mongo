import { Course } from './../../interfaces/courses.interface';
import { CoursesService } from './../../services/courses.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
    public courses: Course[];

    constructor(private coursesService: CoursesService) {
        this.courses = this.coursesService.getAllCourses();
    }
}
