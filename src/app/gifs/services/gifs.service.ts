import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _history: string[] = [];
  private apiKey: string = 'Za8slqD5bQKeQdrVWf51LGzLUkaryFhn';
  private giphyUrl: string = 'https://api.giphy.com/v1/gifs';

  public results: Gif[] = [];

  get history(): string[] {
    return [...this._history];
  }

  constructor(
    private http: HttpClient,
  ) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
   }

  searchGifs(query: string) {
    if (query.trim().length && !this._history.includes(query)) {
      query = query.trim().toLowerCase();
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);
      localStorage.setItem('history', JSON.stringify(this._history));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', '10')
      .set('rating', 'g');
    this.http.get<SearchGIFResponse>(`${this.giphyUrl}/search`, { params })
      .subscribe(response => {
        this.results = response.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }
}
