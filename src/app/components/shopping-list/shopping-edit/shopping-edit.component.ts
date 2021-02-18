import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShoppingListsService } from 'src/app/services/shoppinglists.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', { static: false}) nameInputRef!: ElementRef;
  @ViewChild('amountInput', { static: false}) amountInputRef!: ElementRef;      
  
  constructor(private sls: ShoppingListsService) { }

  ngOnInit(): void {
  }

  addItem() {
    const ingName = this.nameInputRef.nativeElement.value, ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.sls.addIngredient(newIngredient);
  } 

}
