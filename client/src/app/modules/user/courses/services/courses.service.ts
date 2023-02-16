import { Course } from './../interfaces/courses.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private coursesDummy: Course[] = [
    {
      id: 1,
      title: 'Basics of Angular',
      description: 'Introductory course for Angular and framework basics'
    },
    {
      id: 2,
      title: 'Basics of TypeScript',
      description: 'Beginner course for Typescript and its basics'
    },
    {
      id: 3,
      title: 'Android N: Quick Settings',
      description: 'Step by step guide for Android N: Quick Settings'
    },
    {
      id: 4,
      title: 'Build an App for the Google Assistant with Firebase',
      description: 'Dive deep into Google Assistant apps using Firebase'
    },
    {
      id: 5,
      title: 'Keep Sensitive Data Safe and Private',
      description: 'Learn how to keep your important data safe and private'
    },
    {
      id: 6,
      title: 'Manage Your Pivotal Cloud Foundry App\'s Using Apigee Edge',
      description: 'Introductory course for Pivotal Cloud Foundry App'
    }
  ];


  //Returns all the courses for the user
  public getAllCourses() : Course[]{
    return this.coursesDummy;
  }
}
