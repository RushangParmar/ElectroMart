import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  interval: any;
  totalSlides: number = 0;
  slidesToShow: number = 3;

  ngOnInit() {
    // Wait for the DOM to load slides
    setTimeout(() => {
      this.setupSlides();
      this.startSlideShow();
    }, 0);
  }

  setupSlides() {
    const slides = document.querySelectorAll('.slide');
    this.totalSlides = slides.length;
  }

  startSlideShow() {
    this.interval = setInterval(() => {
      this.moveSlide(1);
    }, 3000); // Adjust timing as needed
  }

  moveSlide(step: number) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Calculate the next index
    this.currentIndex = (this.currentIndex + step + totalSlides) % totalSlides;

    // Adjust the transform property to show the correct slide
    const offset = -this.currentIndex * (100 / this.slidesToShow);
    document.querySelector('.slideshow')!.setAttribute('style', `transform: translateX(${offset}%)`);
  }

  ngOnDestroy() {
    clearInterval(this.interval); // Clean up the interval on component destroy
  }
}
