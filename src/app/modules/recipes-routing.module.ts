import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent } from "../components/recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "../components/recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "../components/recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "../components/recipes/recipes.component";
import { AuthGuard } from "../guards/auth.guard";
import { RecipesResolver } from "../services/recipes-resolver.service";

const routes: Routes = [
    { path: '', component: RecipesComponent, canActivate: [AuthGuard],
    children: [
      {path: '', component: RecipeStartComponent },    
      {path: 'new', component: RecipeEditComponent },
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolver] },
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolver] },    
    ]    
  }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class RecipesRoutingModule { }