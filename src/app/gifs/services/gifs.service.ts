import { HttpClient } from '@angular/common/http';
import { Injectable,computed,effect,inject, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, of, tap } from 'rxjs';
import { O } from 'node_modules/@angular/router/router_module.d-6zbCxc1T';

const GIF_KEY='gifs';

const loadFromLocalStorage=()=>{
  const gifsFromLocalStorage=localStorage.getItem(GIF_KEY) ?? '{}';

    const gifs=JSON.parse(gifsFromLocalStorage);
    return gifs;

}



@Injectable({providedIn: 'root'})
export class GifsService {
  private http=inject(HttpClient);

  trendinGifs=signal<Gif[]>([]);
  trendingGifLoading=signal(false);
  private trendingPage=signal(0);

  trendingGifGroup=computed<Gif[][]>(()=>{
    const groups=[];
    for(let i=0;i<this.trendinGifs().length;i+=3){
      groups.push(this.trendinGifs().slice(i,i+3));
    }
    console.log({groups});

    return groups;
  })

  searchHistory=signal<Record<string,Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys=computed(()=>Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }
  saveGifsTolocalStorage= effect(() => {
    const historyString =JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY,historyString);
  })
  // This method is used to load trending gifs from the Giphy API

  loadTrendingGifs(){
    if(this.trendingGifLoading()) return;
    this.trendingGifLoading.set(true);
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`,{params:{api_key:environment.giphyApiKey,limit:20,rating:'g'}})
    .subscribe((response:any)=>{
      const gifs=GifMapper.mapGiphyItemsToGifArray(response.data);
      this.trendinGifs.update(currentGifs=>[...currentGifs, ...gifs]);
      this.trendingPage.update((page)=>page+1);
      this.trendingGifLoading.set(false);
      console.log(gifs);
    }
    );

  }
  searchGifs(query:string):Observable<Gif[]>{
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,
        {params:
          {
            api_key:environment.giphyApiKey,
            limit:20,
            offset:this.trendingPage()*20,
            rating:'g',

            q:query}})
    .pipe(
      // tap(resp=>console.log({resp}))
      // map((resp)=>console.log(`Hola mundo ${resp.data.length}`)),
      map(({data})=>data),
      map((items)=>GifMapper.mapGiphyItemsToGifArray(items)),
      tap((items)=>{
        this.searchHistory.update((history)=>({
          ...history,
          [query.toLowerCase()]:items,
        }));
      })
    )
    // .subscribe((response:any)=>{
    //   const gifs=GifMapper.mapGiphyItemsToGifArray(response.data);
    //   // this.trendinGifs.set(gifs);
    //   // this.trendingGifLoading.set(false);
    //   console.log(gifs);
    // }
    // );

  }
  getHistoryGifs(query:string):Gif[]{
    return this.searchHistory()[query] ?? [];
  }
}
