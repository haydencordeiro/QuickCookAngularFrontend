import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cusinefilter',
  templateUrl: './cusinefilter.component.html',
  styleUrl: './cusinefilter.component.scss'
})
export class CusinefilterComponent {
  cuisines:string[] = [
    'All',
    'Chinese',
    'Italian',
    'Mexican',
    'Indian',
    'Japanese',
    'Thai',
    'French',
    'Mediterranean',
    'American',
    'Korean',
    'Greek',
    'Spanish',
    'Brazilian',
    'Caribbean',
  ];
  selectedCusine:string = 'All'
  @Output() cuisineSelected: EventEmitter<string> = new EventEmitter<string>();

  selectCusine(cuisine:string): void {
    this.selectedCusine=cuisine;
    this.cuisineSelected.emit(cuisine);

    // alert(this.selectedCusine)
  }
}
