import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: () => import('./modules/recipes.module').then(module => module.RecipesModule) },
  { path: 'shopping-list', loadChildren: () => import('./modules/shopping-list.module').then(module => module.ShoppingListModule) },
  { path: 'auth', loadChildren: () => import('./modules/auth.module').then(module => module.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
