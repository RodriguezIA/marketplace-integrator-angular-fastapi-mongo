import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { courses as coursesData } from 'app/mock-api/apps/courses/data';

@Injectable({
    providedIn: 'root',
})
export class CoursesApi {
    private _courses: any[] = coursesData;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // -----------------------------------------------------------------------------------------------------
        // @ Courses - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService.onGet('api/apps/courses/user').reply(() => {
            // Clone the courses
            const courses = cloneDeep(this._courses);
            console.log('called on api');
            return [200, courses];
        });

        // -----------------------------------------------------------------------------------------------------
        // @ Course - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/courses/user/course')
            .reply(({ request }) => {
                // Get the id from the params
                const id = request.params.get('id');

                // Clone the courses and steps
                const courses = cloneDeep(this._courses);

                // Find the course and attach steps to it
                const course = courses.find((item) => item.id === id);

                return [200, course];
            });
    }
}
