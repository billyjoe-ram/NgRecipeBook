import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {  
  
  collapsed = true;
  
  constructor(private data: DataService) { }

  ngOnInit(): void {
  }

  onSaveData() {
    this.data.storeRecipes();
  }

  onFetchData() {
    this.data.fetchRecipes().subscribe();
  }

}
