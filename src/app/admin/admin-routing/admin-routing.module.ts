
import { AdminComponent } from './../admin.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './../../guards/auth.guard';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

import { MenuComponent } from './../menu/menu.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'admin',
        component: MenuComponent,
          canActivate: [AuthGuard],                    
          canActivateChild: [AuthGuard],           
        children: [
          {
            path: '',
            redirectTo: 'menu',
            pathMatch: 'full'
          },
          {
            path: 'menu',
            component: MenuComponent
          },
        ]
      }

    ])
  ],
  providers: [
    AuthGuard    
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }