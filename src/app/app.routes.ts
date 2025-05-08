import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path:'dashboard',
    loadComponent:()=>import('./gifs/pages/dashboard-page/dashboard-page.component'),
    children:[
      {
        path:'search',
        loadComponent:()=>import('./gifs/pages/search-page/search-page.component')
      },
      {
        path:'history/:query',
        loadComponent:()=>import('./gifs/pages/git-history/git-history.component')
      },
      {
        path:'trending',
        loadComponent:()=>import('./gifs/pages/trending-page/trending-page.component')
      },
      {
        path:'**',
        redirectTo:'trending'  // Redirect to dashboard if no other route matches
      }

    ]

  },
  {
    path:'**',
    redirectTo:'dashboard'  // Redirect to dashboard if no other route matches
  }
];
