import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  public id!: number;
  public editMode: boolean = false;
  public recipeForm!: FormGroup;
  
  constructor(private route: ActivatedRoute, private recipes: RecipesService, private router: Router) { }

  private initForm() {    
    let recipeName = '', recipeImgPath = '', recipeDescription = '', recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipes.getRecipe(this.id);      

      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        recipe.ingredients.forEach(ingredient => {

          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.min(1), Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )

        });
        
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required, Validators.minLength(2)]),
      'imagePath': new FormControl(recipeImgPath, [Validators.required, Validators.minLength(2)]),
      'description': new FormControl(recipeDescription, [Validators.required, Validators.minLength(2)]),
      'ingredients': recipeIngredients
    });
  }
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      
      this.initForm();      
    });
  }

  onSubmit() {
    // const recipeName = this.recipeForm.value['name'];
    // const recipeImgPath = this.recipeForm.value['imagePath'];
    // const recipeDescription = this.recipeForm.value['description'];    
    // const recipeIngredients = this.recipeForm.value['ingredients'];

    // const newRecipe = new Recipe(recipeName, recipeDescription, recipeImgPath, recipeIngredients);

    if (this.editMode) {
      this.recipes.updateRecipe(this.id, this.recipeForm.value);    
    } else {
      this.recipes.addRecipe(this.recipeForm.value);
    }

    this.onCancel()
    
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.min(1), Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
