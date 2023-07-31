import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appColoredScore]'
})
export class ColoredScoreDirective implements OnInit {

  @Input() appColoredScore = 0;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    if(this.appColoredScore >= 4 ) {
      this.el.nativeElement.style.backgroundColor = 'green';
    } else if( this.appColoredScore >=2 && this.appColoredScore < 4) {
      this.el.nativeElement.style.backgroundColor = 'yellow';
    } else {
      this.el.nativeElement.style.backgroundColor = 'red';
    }
  }
}
