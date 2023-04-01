import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatTabGroup } from '@angular/material/tabs';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { CoursesService } from '../../services/courses.service';
import { Course } from 'app/modules/user/courses/interfaces/courses.interface';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html'
})
export class CourseComponent implements OnInit, OnDestroy {

    @ViewChild('courseSteps', { static: true }) courseSteps: MatTabGroup;
    public course: Course;
    public currentStep: number = 0;
    public drawerMode: 'over' | 'side' = 'side';
    public drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    public editorConfig : AngularEditorConfig;

    public addModule(): void {
        let newCourse = {
            order: this.course.steps.length,
            title: 'Nuevo módulo',
            subtitle: 'Descripción del curso'
        }
        this.course.steps.push(newCourse);
        this.course.totalSteps = this.course.steps.length;
        this.goToStep(this.course.totalSteps - 1);
    }

    public guardarCurso(): void {
        
    }

    public deleteCourse(): void{
        this.course.steps.splice(this.currentStep, 1);
        this.course.totalSteps = this.course.steps.length;
        this.reorder();
        this.goToPreviousStep();
    }

    private reorder(): void{
        for (let i = 0; i < this.course.steps.length; i++){
            this.course.steps[i].order = i;
        }
    }

    public onchangeTitle(event) : void {
        this.course.steps[this.currentStep].title = event.target.value;
    }

    public onchangeDescripcion(event) : void {
        this.course.steps[this.currentStep].subtitle = event.target.value;
    }

    /**
     * Go to given step
     *
     * @param step
    */
    goToStep(step: number): void {
        // Set the current step
        this.currentStep = step;

        // Go to the step
        this.courseSteps.selectedIndex = this.currentStep;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Go to previous step
     */
    goToPreviousStep(): void {
        // Return if we already on the first step
        if (this.currentStep === 0) {
            return;
        }

        // Go to step
        this.goToStep(this.currentStep - 1);

        // Scroll the current step selector from sidenav into view
        this._scrollCurrentStepElementIntoView();
    }


    /**
     * Go to next step
     */
    goToNextStep(): void {
        // Return if we already on the last step
        if (this.currentStep === this.course.totalSteps - 1) {
            return;
        }

        // Go to step
        this.goToStep(this.currentStep + 1);

        // Scroll the current step selector from sidenav into view
        this._scrollCurrentStepElementIntoView();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Scrolls the current step element from
     * sidenav into the view. This only happens when
     * previous/next buttons pressed as we don't want
     * to change the scroll position of the sidebar
     * when the user actually clicks around the sidebar.
     *
     * @private
     */
    private _scrollCurrentStepElementIntoView(): void {
        // Wrap everything into setTimeout so we can make sure that the 'current-step' class points to correct element
        setTimeout(() => {

            // Get the current step element and scroll it into view
            const currentStepElement = this._document.getElementsByClassName('current-step')[0];
            if (currentStepElement) {
                currentStepElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }


    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    ngOnInit(): void {
        // Get the course
        this._coursesService.course$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((course: Course) => {

                // Get the course
                this.course = course;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Set the drawerMode and drawerOpened
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this.editorConfig = {
            editable: true,
              spellcheck: false,
              height: '60vh',
              minHeight: '0',
              maxHeight: 'auto',
              width: 'auto',
              minWidth: '0',
              translate: 'no',
              enableToolbar: true,
              showToolbar: true,
              placeholder: 'Enter text here...',
              defaultFontSize: '1.2857143em',
            sanitize: true,
            toolbarPosition: 'top',
            toolbarHiddenButtons: [
              ['fontName'],
              ['insertImage', 'insertVideo']
            ]
        };
    }

    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private _coursesService: CoursesService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    ) { }
}
