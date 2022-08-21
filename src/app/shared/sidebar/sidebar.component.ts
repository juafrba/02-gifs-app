import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  get history() {
    return this.gifService.history;
  }

  constructor(
    private gifService: GifsService,
  ) { }

  search( name: string) {
    this.gifService.searchGifs(name);
  }
}
