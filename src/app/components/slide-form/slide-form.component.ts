import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-slide-form',
  templateUrl: './slide-form.component.html',
  styleUrls: ['./slide-form.component.scss'],
})
export class SlideFormComponent {
  // Output event emitter to notify parent component about added slide
  @Output() slideAdded = new EventEmitter<any>();

  // Form group to manage form controls
  slideForm: FormGroup;

  // Regular expression to validate image file name based on allowed extensions
  imageFileNameRegex: RegExp = /\.(gif|png|jpe?g|bmp|tiff|svg|webp|apng|avif|ico|img)$/;

  // Regular expression to ensure that a string is not null or consists only of spaces
  notNullRegex: RegExp = /^(?=.*\S)[\w\s-]+$/;

  constructor(private formBuilder: FormBuilder) {
    // Initialize the form with form controls and validators
    this.slideForm = this.formBuilder.group({
      imageUrl: ['', [Validators.required, Validators.pattern(this.imageFileNameRegex)]], // Image URL input with required validation and pattern matching
      caption: ['', [Validators.required, Validators.pattern(this.notNullRegex)]], // Caption input with required validation and pattern matching
    });
  }

  // Method to add a slide when the form is submitted
  addSlide() {
    // Check if the form is valid
    if (this.slideForm.valid) {
      // Emit the slideAdded event with the form values
      this.slideAdded.emit(this.slideForm.value);
      // Reset the form after adding the slide
      this.slideForm.reset();
    }
  }
}
