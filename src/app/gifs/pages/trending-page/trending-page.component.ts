import {  AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.services';



@Component({
  selector: 'app-trending-page',
  // imports: [],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.ScrollStateService.trendingScrollState();
  }
  gifsService=inject(GifsService);
  ScrollStateService=inject(ScrollStateService);
  scrollDivRef= viewChild<ElementRef<HTMLDivElement>>('groupDiv');
  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    // console.log('scrollTop', scrollTop);
    // console.log('clientHeight', clientHeight);
    // console.log('scrollDiv', scrollHeight);
    // console.log(scrollTop + clientHeight +300>= scrollHeight )
    const isAtBottom=scrollTop + clientHeight +300>= scrollHeight ;
    // console.log('isAtBottom', isAtBottom);
    this.ScrollStateService.trendingScrollState.set(scrollTop);
    if (isAtBottom) {
       this.gifsService.loadTrendingGifs();
    } else {
      console.log('Not enough scroll to load more gifs');
    }



  }
  // gifs=signal(imageUrls);
}
