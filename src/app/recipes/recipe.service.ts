import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs/Subject";

@Injectable()
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      '1st Recipe',
      'This is simply a test',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
    [
      new Ingredient('Meat', 1),
      new Ingredient('Salt', 5)
    ]),
    new Recipe('2nd Recipe',
      'This is simply a test',
      'https://media-cdn.tripadvisor.com/media/photo-s/1a/b6/fa/3f/img-20200126-203814-largejpg.jpg',
    [
      new Ingredient('Buns', 2),
      new Ingredient('Cheese', 1)
    ])
  ];
  constructor(private slService: ShoppingListService) {
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index:number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());

  }

  deleteRecipe(index: number) {
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
