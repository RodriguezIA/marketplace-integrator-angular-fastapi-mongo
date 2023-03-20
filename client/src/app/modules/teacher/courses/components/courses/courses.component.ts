import { BehaviorSubject, Subject, takeUntil, combineLatest } from 'rxjs';
import { CoursesService } from './../../services/courses.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from 'app/modules/user/courses/interfaces/courses.interface';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
    
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    public courses: Course[] = [];
    public filteredCourses: Course[] = [];
    public filters: {
        query$: BehaviorSubject<string>;
    } = {
        query$: new BehaviorSubject(''),
    };

    public filterByQuery(query: string): void {
        this.filters.query$.next(query);
    }

    ngOnInit(): void {
        // get courses
        this._coursesService.courses$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((courses: Course[]) => {
                this.courses = this.filteredCourses = courses;
                console.log('called from component');
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Filter the courses
        combineLatest([this.filters.query$]).subscribe(([query]) => {
            // Reset the filtered courses
            this.filteredCourses = this.courses;

            // Filter by search query
            if (query !== '') {
                this.filteredCourses = this.filteredCourses.filter(
                    (course) =>
                        course.title
                            .toLowerCase()
                            .includes(query.toLowerCase()) ||
                        course.description
                            .toLowerCase()
                            .includes(query.toLowerCase())
                );
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    constructor(
        private _coursesService: CoursesService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}
}
