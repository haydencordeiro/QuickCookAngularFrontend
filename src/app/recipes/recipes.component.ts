import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})

export class RecipesComponent implements OnInit {
  recipes: any[] = [{
    'title': "This is the video description",
    "recipeURL": "https://www.youtube.com/watch?v=suXQ2mPfhSg",
    "picture": "https://images.pexels.com/photos/3054690/pexels-photo-3054690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "cuisine": "Italian"
  }
];

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

filteredRecipes: any[] = [];
selectedCuisine: string = 'All';


constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.fetchRecipes();
  }


fetchRecipes(): void {
  this.http.get<any>('https://localhost:7144/api/recipes').subscribe(
    (response) => {
      this.recipes = response;
      this.filteredRecipes = this.recipes;
      this.processRecipes();
      console.log(this.recipes);
    },
    (error) => {
      console.error('Error fetching recipes:', error);
    }
  );
}

processRecipes(): void {
  for (let i = 0; i < this.recipes.length; i++) {
    const videoId = this.extractVideoId(this.recipes[i].recipeURL);
    const newVideoID = `https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1`
    this.recipes[i].recipeURL = this.sanitizer.bypassSecurityTrustResourceUrl(newVideoID);

    // // Extracting picture ID
    // if (this.recipes[i].picture) {
    //   const pictureUrl = this.recipes[i].picture;
    //   const startIndex = pictureUrl.lastIndexOf('-') + 1;
    //   const endIndex = pictureUrl.lastIndexOf('.');
    //   if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    //     this.recipes[i].pictureId = pictureUrl.substring(startIndex, endIndex);
    //   } else {
    //     // Handle the case when picture ID cannot be extracted
    //     this.recipes[i].pictureId = null;
    //   }
    // }
    
    const displayPictureURL = `https://images.pexels.com/photos/${this.recipes[i].picture}/pexels-photo-${this.recipes[i].picture}.jpeg`
    this.recipes[i].picture = this.sanitizer.bypassSecurityTrustResourceUrl(displayPictureURL);
  }
}

extractVideoId(url: string): string {
  const regex = /[?&]v=([^&]+)/;
  const match = regex.exec(url);
  return match ? match[1] : '';
}

  onCuisineSelected(cuisine: string): void {
    // alert(`Selected cuisine: ${cuisine}`);
    this.selectedCuisine = cuisine;
    this.filterRecipes();
  }

  filterRecipes(): void {
    if (this.selectedCuisine === 'All') {
      this.filteredRecipes = this.recipes;
    } else {
      this.filteredRecipes = this.recipes.filter(recipe => recipe.cuisine === this.selectedCuisine);
    }
  }

}