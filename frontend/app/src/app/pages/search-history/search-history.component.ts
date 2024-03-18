import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchHistoryService } from 'src/app/core/services/search-history.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {
  searchHistory: any[] = [];

  constructor(
    private searchHistoryService: SearchHistoryService,
    private router: Router) { }

  ngOnInit(): void {
    this.searchHistory = this.searchHistoryService.getSearchHistory();
  }

  goIndex() {
    this.router.navigate(['/index']);
  } 
}
