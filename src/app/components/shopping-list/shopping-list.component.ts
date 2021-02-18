import { Component, OnInit} from '@angular/core';

import { ShoppingListsService } from 'src/app/services/shoppinglists.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  
  ingredients: Ingredient[] = [];
  
  constructor(private sls: ShoppingListsService) { }

  ngOnInit(): void {
    this.ingredients = this.sls.getIngredients();
    this.sls.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }

}
