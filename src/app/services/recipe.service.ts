import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, find } from 'rxjs/operators';
import { Recipe } from '../models/recipe';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  httpOptions: any = {
    observe: 'response'
  };

  private recipes = [];
  private _isLoadingFinished: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  public readonly isLoadingFinished: Observable<Boolean> = this._isLoadingFinished.asObservable();
  private apiUrl = "http://starlord.hackerearth.com/recipe";
  private jsonUrl = "assets/json/recipes.json";

  public getRecipesFromServer() {
    return this.http.get(this.apiUrl, this.httpOptions).pipe(map(result => result['body']));
  }

  public getRecipesListfromJSON() {
    return this.http.get(this.jsonUrl, this.httpOptions).pipe(map(result => result['body']));
  }

  public setLocalRecipes(){
    this.getRecipesFromServer().subscribe(recipes => {
      this.recipes = recipes;
      this._isLoadingFinished.next(true);
    },
    error=>{
      this.getRecipesListfromJSON().subscribe(recipes => {
        this.recipes = recipes;
        this._isLoadingFinished.next(true);
      });
    }
    )
  }

  public getRecipeList(){
    return this.recipes;
  }

  public getRecipeById(id: number){
    return this.recipes.find(r => r.id === id);
  }

}
