import { Component, Input  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Component({
  selector: 'app-addrecipes',
  templateUrl: './addrecipes.component.html',
  styleUrl: './addrecipes.component.scss'
})
export class AddrecipesComponent {

  constructor(private http: HttpClient) { }


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
    const recipeData = {
      "id": 0,
      "title": this.formData.Title,
      "recipeURL": this.formData.RecipeURL,
      "picture": "",
      "cuisine": this.formData.Cuisine
    };

    this.http.post<any>('https://localhost:7144/api/recipes', recipeData, httpOptions)
    .subscribe(
      (response) => {
        console.log('Recipe added successfully!', response);
        // You can add further actions here upon successful addition
      },
      (error) => {
        console.error('Error adding recipe:', error);
        // Handle error response here
      }
    );  
    this.formData = {
      'Title': '',
      'RecipeURL': '',
      'Picture': '',
      'Cuisine': 'All'
    };
    this.closeForm();
  }
}
