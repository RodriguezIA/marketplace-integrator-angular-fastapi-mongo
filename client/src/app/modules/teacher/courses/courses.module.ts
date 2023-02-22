import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './components/courses/courses.component';
import { Route, RouterModule } from '@angular/router';


const routes: Route[] = [
  {
      path     : '',
      component: CoursesComponent
  }
];


@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CoursesModule { }
