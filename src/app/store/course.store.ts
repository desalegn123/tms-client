import { inject } from '@angular/core';
import { EMPTY, catchError } from 'rxjs';

import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { removeEntity, setAllEntities, withEntities } from '@ngrx/signals/entities';

import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';

export const CourseStore = signalStore(
  { providedIn: 'root' },

  // Store course entities
  withEntities<Course>(),

  // Store additional state required by the lab
  withState({
    error: '',
  }),

  withMethods((store, svc = inject(CourseService)) => ({
    deleteCourse(id: number) {
      // 1. Take a snapshot BEFORE changing the UI
      const previousSnapshot = store.entities();

      // 2. Immediately remove the course from the UI
      patchState(store, removeEntity(id));

      // 3. Send the delete request to the backend
      svc
        .delete(id)
        .pipe(
          catchError((err) => {
            // 4. Backend rejected the deletion

            // Restore the previous snapshot
            patchState(store, setAllEntities(previousSnapshot));

            // Store the error message
            patchState(store, {
              error: 'Cannot delete course: active student enrollments exist.',
            });

            return EMPTY;
          }),
        )
        .subscribe();
    },
  })),
);
