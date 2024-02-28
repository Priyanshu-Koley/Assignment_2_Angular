import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slide-list',
  templateUrl: './slide-list.component.html',
  styleUrls: ['./slide-list.component.scss'],
})
export class SlideListComponent {
  // Input property to receive an array of slides from parent component
  @Input() slides: any[] = [];

  // Output event emitter to notify parent component about deleted slide
  @Output() slideDeleted = new EventEmitter<any>();

  // Method to delete a slide and emit event to notify parent component
  deleteSlide(slide: any) {
    this.slideDeleted.emit(slide);
  }
}
