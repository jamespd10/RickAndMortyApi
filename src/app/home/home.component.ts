import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../services/service.service';

import { CharacterI, Result } from '../interfaces/character.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public characters: Result[] = [];
  public page: number = 1;
  public pages: number[] = [1, 2, 3];

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.getAll();
  }

  public getAll(p: number = 0) {
    let pagina = p > 0 ? p : this.page;
    this.service.getAll(pagina).subscribe(resp => {
      this.characters = resp.results;
    });
  }

  public prev() {
    if (this.page > 1) {
      this.page--;
      this.getAll();
    }
    if (this.pages[0] != 1)
      this.setPages();
  }

  public setPage(page: number) {
    this.page = page;
    this.getAll(page);
    if (this.pages[0] != 1 && this.pages[0] == this.page)
      this.setPages();
    else if (this.pages[this.pages.length - 1] == this.page)
      this.setPages(true);
  }

  public next() {
    this.page++;
    this.setPages(true);
    this.getAll();
  }

  public setPages(isNext: boolean = false) {
    if (isNext) {
      this.pages.push(this.pages[this.pages.length - 1] + 1);
      this.pages.shift();
    }
    else {
      this.pages.unshift(this.pages[0] - 1);
      this.pages.pop();
    }
  }

}
