import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  
  constructor(private data: DataService) { }

  ngOnInit(): void {
  }

}
