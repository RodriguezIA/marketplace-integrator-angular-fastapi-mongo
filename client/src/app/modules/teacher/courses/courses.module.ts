import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { MatTabsModule } from '@angular/material/tabs';

import { CourseComponent } from './components/course/course.component';
import { OutletComponent } from './components/outlet/outlet.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseResolver, CoursesResolver } from './resolvers/courses.resolver';
import { SharedModule } from 'app/shared/shared.module';

const routes: Route[] = [
    {
        path: '',
        component: OutletComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: CoursesComponent,
                resolve: {
                    courses: CoursesResolver,
                },
            },
            {
                path: ':id',
                component: CourseComponent,
                resolve: {
                    course: CourseResolver,
                },
            },
        ],
    },
];

@NgModule({
    declarations: [CoursesComponent, CourseComponent, OutletComponent],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        FuseFindByKeyPipeModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatTabsModule,
        SharedModule,
    ],
})
export class CoursesModule {}
