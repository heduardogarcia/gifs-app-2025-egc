import {  Component,computed,effect,inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'app-git-history',
  imports: [GifListComponent],
  templateUrl: './git-history.component.html',
})
export default class GitHistoryComponent {
  // query=inject(ActivatedRoute).params.subscribe((params)=>{
  //   console.log({params});
  // })
  gifservice=inject(GifsService);
  query=toSignal(inject(ActivatedRoute).params
    .pipe(map((params)=>params['query']))// query=inject(ActivatedRoute).params.pip;
);
gifsByKey=computed(()=>{
  return this.gifservice.getHistoryGifs(this.query())
})//.pipe(map((params)=>params['query']))// query=inject(ActivatedRoute).params.pip;
  // gifByKey=toSignal(this.gifservice.getHistoryGifs(this.query()));


}
