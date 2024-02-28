import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, OnDestroy, OnChanges {
  @Input() slides: any[] = []; // Input property to receive an array of slides
  currentIndex: number = 0; // Index of the currently displayed slide
  interval!: Subscription; // Subscription object for managing the interval
  hadSetInterval: boolean = false; // Flag to track whether the interval has been set

  ngOnInit() {
    this.startCarousel(); // Initialize the carousel when the component is initialized
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("change occurred in slides");
    
    // Check if there's a change in slides array and handle accordingly
    if (this.hadSetInterval === false && this.slides.length > 1 && changes['slides'] && !changes['slides'].firstChange) {
      this.startCarousel(); // Start the carousel if conditions are met
      this.hadSetInterval = true; // Set flag to indicate interval is set
      this.currentIndex = 0; // Reset current index to 0
    }
    else if(this.slides.length === 1)
    {
      this.stopCarousel(); // Stop the carousel if there's only one slide
      this.hadSetInterval = false; // Reset flag indicating interval is not set
      this.currentIndex = 0; // Reset current index to 0
    }
    else {
      this.currentIndex = 0; // Reset current index to 0 for other cases
    }
  }

  ngOnDestroy() {
    this.stopCarousel(); // Cleanup when the component is destroyed
  }

  startCarousel() {
    // Start the carousel if there are slides available
    if (this.slides.length !== 0) {
      // Set an interval to switch to the next slide every 4000 milliseconds
      this.interval = interval(4000).subscribe(() => {
        this.nextSlide();
      });
    }
  }

  stopCarousel() {
    // Unsubscribe from the interval to stop the carousel
    if (this.interval) {
      this.interval.unsubscribe();
    }
  }

  nextSlide() {
    // Move to the next slide, loop back to the beginning if at the last slide
    this.currentIndex = this.currentIndex === this.slides.length - 1 ? 0 : this.currentIndex + 1;
  }

  prevSlide() {
    // Move to the previous slide, loop back to the last slide if at the first slide
    this.currentIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
  }

  goToSlide(index: number) {
    // Go to a specific slide by setting the currentIndex
    this.currentIndex = index;
  }
}
