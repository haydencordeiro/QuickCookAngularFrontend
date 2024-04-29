import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-addrecipes',
  templateUrl: './addrecipes.component.html',
  styleUrl: './addrecipes.component.scss'
})
export class AddrecipesComponent {
  @Input() cuisines: string[] = [];

  isFormOpened:boolean = true;
  formData: any = {
    'Title': '',
    'RecipeURL': '',
    'Picture': '',
    'Cuisine': 'All'
  };

  openForm():void {
    this.isFormOpened = true;
  }
  closeForm():void{
    this.isFormOpened = false;
  }
  onSubmit() {
    console.log('Form submitted:', this.formData);
    // You can perform further actions here, like sending the data to a server
  }
}
