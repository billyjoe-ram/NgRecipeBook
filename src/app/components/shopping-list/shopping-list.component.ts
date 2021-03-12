import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShoppingListsService } from 'src/app/services/shoppinglists.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  ingredients: Ingredient[] = [];
  private subscription!: Subscription;
  
  constructor(private sls: ShoppingListsService) { }

  ngOnInit(): void {
    this.ingredients = this.sls.getIngredients();
    this.subscription = this.sls.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.sls.startedEditing.next(index);
  }

}
