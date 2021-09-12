import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { RecipesService } from './services/recipes.service';
import { ShoppingListsService } from './services/shoppinglists.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';


@NgModule({
  providers: [
    RecipesService,
    ShoppingListsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule { }
