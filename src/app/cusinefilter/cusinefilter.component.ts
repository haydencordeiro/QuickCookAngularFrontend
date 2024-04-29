import { Component, EventEmitter, Output, Input  } from '@angular/core';

@Component({
  selector: 'app-cusinefilter',
  templateUrl: './cusinefilter.component.html',
  styleUrl: './cusinefilter.component.scss'
})
export class CusinefilterComponent {
  @Input() cuisines: string[] = [];
  selectedCusine:string = 'All'
  @Output() cuisineSelected: EventEmitter<string> = new EventEmitter<string>();

  selectCusine(cuisine:string): void {
    this.selectedCusine=cuisine;
    this.cuisineSelected.emit(cuisine);

    // alert(this.selectedCusine)
  }
}
