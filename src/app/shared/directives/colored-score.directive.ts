import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appColoredScore]'
})
export class ColoredScoreDirective {

  @Input() appColoredScore: number = 0;

  constructor(private el: ElementRef) {}

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
