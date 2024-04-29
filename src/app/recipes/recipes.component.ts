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
    'Title': "This is the video description",
    "RecipeURL": "https://www.youtube.com/watch?v=suXQ2mPfhSg",
    "Picture": "https://images.pexels.com/photos/3054690/pexels-photo-3054690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Cuisine": "Italian"
  },
  {
    'Title': "This is the video description",
    "RecipeURL": "https://www.youtube.com/watch?v=suXQ2mPfhSg",
    "Picture": "https://images.pexels.com/photos/3054690/pexels-photo-3054690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Cuisine": "Mexican"
  }, {
    'Title': "This is the video description",
    "RecipeURL": "https://www.youtube.com/watch?v=suXQ2mPfhSg",
    "Picture": "https://images.pexels.com/photos/3054690/pexels-photo-3054690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Cuisine": "French"
  },
  {
    'Title': "This is the video description",
    "RecipeURL": "https://www.youtube.com/watch?v=suXQ2mPfhSg",
    "Picture": "https://images.pexels.com/photos/3054690/pexels-photo-3054690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Cuisine": "Korean"
  }, {
    'Title': "This is the video description",
    "RecipeURL": "https://www.youtube.com/watch?v=suXQ2mPfhSg",
    "Picture": "https://images.pexels.com/photos/3054690/pexels-photo-3054690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Cuisine": "Indian"
  },
  {
    'Title': "This is the video description",
    "RecipeURL": "https://www.youtube.com/watch?v=suXQ2mPfhSg",
    "Picture": "https://images.pexels.com/photos/3054690/pexels-photo-3054690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Cuisine": "Greek"
  }, {
    'Title': "This is the video description",
    "RecipeURL": "https://www.youtube.com/watch?v=suXQ2mPfhSg",
    "Picture": "https://images.pexels.com/photos/3054690/pexels-photo-3054690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Cuisine": "Thai"
  },
  {
    'Title': "This is the video description",
    "RecipeURL": "https://www.youtube.com/watch?v=suXQ2mPfhSg",
    "Picture": "https://images.pexels.com/photos/3054690/pexels-photo-3054690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Cuisine": "Chinese"
  }, {
    'Title': "This is the video description",
    "RecipeURL": "https://www.youtube.com/watch?v=suXQ2mPfhSg",
    "Picture": "https://images.pexels.com/photos/3054690/pexels-photo-3054690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Cuisine": "Mediterranean"
  },
  {
    'Title': "This is the video description",
    "RecipeURL": "https://www.youtube.com/watch?v=suXQ2mPfhSg",
    "Picture": "https://images.pexels.com/photos/3054690/pexels-photo-3054690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "Cuisine": "Japanese"
  }
];

filteredRecipes: any[] = [];
selectedCuisine: string = 'All';


constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.fetchRecipes();
  }

  extractVideoId(url: string): string {
    // Regular expression to match the video ID after ?v=
    var regex = /[?&]v=([^&]+)/;
    // Execute the regular expression and get the matches
    var match = regex.exec(url);
    // If there's a match, return the ID (group 1)
    if (match) {
        return match[1];
    } else {
        // If no match found, return null or handle accordingly
        return "";
    }
}
  fetchRecipes(): void {


    // this.http.get<any>('https://fakestoreapi.com/products?limit=5')
    //   .subscribe(response => {
    //     this.recipes = response;
    //     console.log(response);
        
    //   });
    for (let i = 0; i < this.recipes.length; i++) {
      // Extract video ID from the RecipeURL
      const videoId = this.extractVideoId(this.recipes[i].RecipeURL);
      // Update RecipeURL with the extracted video ID
      console.log(videoId);
      const newVideoID = `https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1`
      this.recipes[i].RecipeURL = this.sanitizer.bypassSecurityTrustResourceUrl(newVideoID);
    }
    this.filteredRecipes = this.recipes;

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
      this.filteredRecipes = this.recipes.filter(recipe => recipe.Cuisine === this.selectedCuisine);
    }
  }

}