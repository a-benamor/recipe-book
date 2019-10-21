import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toogleOpen() {
    this.isOpen = !this.isOpen;
    // this.displayOrNotTheDropdownList(this.isOpen);
  }

  constructor(private target: ElementRef, private renderer: Renderer2) { }

  displayOrNotTheDropdownList(openDropdown: boolean) {
    if (openDropdown) {
      this.renderer.addClass(this.target.nativeElement, 'open');
    } else {
        this.renderer.removeClass(this.target.nativeElement, 'open');
    }
  }

}
