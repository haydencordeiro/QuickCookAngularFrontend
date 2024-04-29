import { Component } from '@angular/core';

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
  selectedCusine:string = ''
  fun(cuisine:string): void {
    this.selectedCusine=cuisine;
    // alert(this.selectedCusine)
  }
}
