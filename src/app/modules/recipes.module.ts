import { NgModule } from "@angular/core";

import { SharedModule } from "./shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipesRoutingModule } from "./recipes-routing.module";

import { RecipeDetailComponent } from "../components/recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "../components/recipes/recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "../components/recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "../components/recipes/recipe-list/recipe-list.component";
import { RecipeStartComponent } from "../components/recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "../components/recipes/recipes.component";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
    imports: [
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule
    ],
    exports: [
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ]
})
export class RecipesModule {

}