import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailResolverService } from './email-resolver.service';
import { EmailPlaceholderComponent } from './email-placeholder/email-placeholder.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  //lazily loaded module
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent
      },
      //:id means anything after the root path stored in a variable called id
      { 
        path: ':id',
        component: EmailShowComponent,
        // the resolver needs to run before EmailShowComponent is shown
        resolve: {
          email: EmailResolverService
        }
      },
      { 
        path: '', 
        component: EmailPlaceholderComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
