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
    'title': '',
    'recipeURL': '',
    'picture': '',
    'cuisine': 'All'
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
      "title": this.formData.title,
      "recipeURL": this.formData.recipeURL,
      "picture": "",
      "cuisine": this.formData.cuisine
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
      'title': '',
      'recipeURL': '',
      'picture': '',
      'cuisine': 'All'
    };
    this.closeForm();
  }
}
