import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { ShoppingListsService } from 'src/app/services/shoppinglists.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: false} ) slForm!: NgForm;

  editingSubscription!: Subscription;
  editMode: boolean = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;
  
  constructor(private sls: ShoppingListsService) { }

  ngOnInit(): void {    

    this.editingSubscription = this.sls.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.sls.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })      

    });
  }

  onSubmit(form: NgForm) {    
    const value: Ingredient = form.value;    
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.sls.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.sls.addIngredient(newIngredient);      
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {    
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {    
    this.sls.deleteIngredients(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {    
    this.editingSubscription.unsubscribe();
  }

}
