import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'hjem',
        children: [
          {
            path: '',
            loadChildren: '../pages/hjem/hjem.module#HjemPageModule'
          }
		],
      },
      {
        path: 'program',
        children: [
          {
            path: '',
            loadChildren: '../pages/program/program.module#ProgramPageModule'
          }
        ]
      },
      {
        path: 'info',
        children: [
          {
            path: '',
            loadChildren: '../pages/info/info.module#InfoPageModule'
          }
        ]
	  },
	  {
        path: 'innstillinger',
        children: [
          {
            path: '',
            loadChildren: '../pages/innstillinger/innstillinger.module#InnstillingerPageModule'
          }
        ]
	  }
	  ,
      {
        path: '',
        redirectTo: '/app/hjem',
        pathMatch: 'full'
	  }
    ]
  }/*,
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }*/
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
