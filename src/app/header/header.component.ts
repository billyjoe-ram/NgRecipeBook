import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  collapsed: boolean = true;

  isAuthenticated: boolean = false;

  private userSubscription!: Subscription;
  
  constructor(private data: DataService, private auth: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.auth.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onSaveData() {
    this.data.storeRecipes();
  }

  onFetchData() {
    this.data.fetchRecipes().subscribe();
  }

  onLogout() {
    this.auth.logout();
  }

}
