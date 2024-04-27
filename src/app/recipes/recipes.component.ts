import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})

export class RecipesComponent implements OnInit {
  recipes: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchRecipes();
  }

  fetchRecipes(): void {
    this.http.get<any>('https://fakestoreapi.com/products?limit=5')
      .subscribe(response => {
        this.recipes = response;
        console.log(response);
        
      });
  }



}