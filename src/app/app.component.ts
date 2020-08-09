import { Component, OnInit } from '@angular/core';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'recipeSite';

  constructor(private recipeService: RecipeService){
  }

  ngOnInit() {
    this.recipeService.setLocalRecipes();
  }

}
