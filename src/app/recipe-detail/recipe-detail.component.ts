import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private location: Location) { }

    recipe: Recipe;

    ngOnInit(): void {
      this.getRecipe();
    }
  
    getRecipe(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.recipeService.isLoadingFinished.subscribe(loaded => {
      if(loaded){
        this.recipe = this.recipeService.getRecipeById(id);
      }
    });
      this.recipe = this.recipeService.getRecipeById(id);
    }

  goBack(): void {
    this.location.back();
  }

}
