import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './components/courses/courses.component';
import { Route, RouterModule } from '@angular/router';
import { FuseCardModule } from '@fuse/components/card';
import { CourseComponent } from './components/course/course.component';


const routes: Route[] = [
  {
      path     : '',
      component: CoursesComponent
  },
  {
    path: 'course/:id',
    component: CourseComponent
  }
];

@NgModule({
  declarations: [
    CoursesComponent,
    CourseComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseCardModule,
    CommonModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class CoursesModule { }
