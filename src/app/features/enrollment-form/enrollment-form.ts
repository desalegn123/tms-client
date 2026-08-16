import { Component, inject, signal } from "@angular/core";
import {FormBuilder, FormControl,Validators,ReactiveFormsModule,FormArray} from "@angular/forms";
@Component({
selector: "app-enrollment-form",
standalone: true,
imports: [ReactiveFormsModule], // Required without this, Angular does not recognize form directives
templateUrl: "./enrollment-form.html",
styleUrl: "./enrollment-form.scss",
})
export class EnrollmentForm {
  private fb = inject(FormBuilder);
  submitted = signal(false);
  form = this.fb.nonNullable.group({
studentId: [
"",
[Validators.required, Validators.pattern("^STU-[0-9]{4}$")],
],
courseId: ["", Validators.required],
term: ["Fall 2026", Validators.required],
notes: [""],
backupCourses: this.fb.array<FormControl<string>>([]),
});
get backups() {
return this.form.controls.backupCourses;
}
addBackup() {
this.backups.push(
this.fb.control("", {
nonNullable: true,
validators: Validators.required,
}),
);
}
removeBackup(index: number) {
this.backups.removeAt(index);
}
submit() {
if (this.form.valid) {
  const payload = this.form.getRawValue();
console.log("Enrollment payload:", payload);
this.submitted.set(true);
} else {
  this.form.markAllAsTouched();
}
}
}