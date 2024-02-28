import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Assignment_2_Angular';
  slides: any[] = [];

  addSlide(slideData: any) {
    this.slides = [...this.slides, slideData];
  }

  deleteSlide(slide: any) {
    const index = this.slides.indexOf(slide);
    if (index !== -1) {
      let temp_slides = this.slides;
      temp_slides.splice(index, 1);
      this.slides = [...temp_slides];// to trigger change detection

    }
  }
}
