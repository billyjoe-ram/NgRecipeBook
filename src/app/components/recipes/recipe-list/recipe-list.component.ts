import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Bolinho Kirk Douglas', 'Bolinho tão bom quanto o Kirk Douglas é bom ator', 'https://th.bing.com/th/id/OIP.tZRCv09dPmmCUK86yDzh9AHaIX?pid=Api&rs=1')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
