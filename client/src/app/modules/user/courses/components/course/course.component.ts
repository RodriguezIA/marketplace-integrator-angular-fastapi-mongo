import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { CoursesService } from './../../services/courses.service';
import { Course } from './../../interfaces/courses.interface';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
    public course!: Course;

    constructor(
        private courseService: CoursesService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
      let id;
      this.activatedRoute.paramMap.subscribe((params: Params) => {
        id = params.get('id');
      })
      this.course = this.courseService.getCourse(id);
    }
}
