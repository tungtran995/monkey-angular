import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';

import { FormsModule, ReactiveFormsModule }     from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MenuComponent
  ],
  exports: [MenuComponent, FormsModule,
    ReactiveFormsModule]
})
export class AdminModule { }
