import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickAway]'
})
export class ClickAwayDirective {
  private isListening = true;
  private clickCounter = 0;

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const clickedInside = this.el.nativeElement.contains(event.target);

    if (clickedInside) {
      this.clickCounter++;
    }

    const inputElement = this.el.nativeElement.querySelector('input');
    const error = this.el.nativeElement.querySelector('clr-control-error');
    const helper = this.el.nativeElement.querySelector('clr-control-helper');

    const inputValue = inputElement ? inputElement.value.trim() : '';

    if (clickedInside) {
      this.isListening = true;
      this.el.nativeElement.classList.remove('clr-error');
      error.classList.remove('clr-error');
      helper.classList.remove('clr-error');
      this.clickCounter = 1;
    }

    if (!inputElement) {
      return; // Si no se encuentra un campo de entrada, no realizar más comprobaciones.
    }

    if (!clickedInside && inputValue === '' && this.clickCounter >= 1) {
      if (!this.isListening) {
        return;
      }

      // Agregar la clase clr-error al elemento
      this.el.nativeElement.classList.add('clr-error');
      error.classList.add('clr-error');
      helper.classList.add('clr-error');

      // Deshabilitar la detección después de realizar la acción
      this.isListening = false;
    }
  }
}
