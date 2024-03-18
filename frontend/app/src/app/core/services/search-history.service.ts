import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {
  private readonly storageKey = 'searchHistory';

  constructor() { }

  saveSearch(query: any) {
    const history = this.getSearchHistory();
    history.unshift(query);
    localStorage.setItem(this.storageKey, JSON.stringify(history));
  }

  getSearchHistory(): any[] {
    const history = localStorage.getItem(this.storageKey);
    return history ? JSON.parse(history) : [];
  }
}
