import {  Component,inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifsService } from 'src/app/gifs/services/gifs.service';


interface MenuOption{
  label: string;
  sublabel: string;
  route:string;
  icon: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './gifs-side-menu-options.component.html',
})
export class GifsSideMenuOptionsComponent {
  gifsService= inject(GifsService);
  menuOptions: MenuOption[] = [
    {
      label: 'Trending',
      sublabel: 'Most popular gifs',
      route: '/dashboard/trending',
      icon: 'fa solid fa-chart-line',
    },
    {
      label: 'Search',
      sublabel: 'Search gifs',
      route: '/dashboard/search',
      icon: 'fa solid fa-magnifying-glass',
    },
  ]
 }
