import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import {ToastrModule} from 'ngx-toastr';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SharedModule } from '../shared/shared.module';
import { ForbiddenComponent } from './forbidden/forbidden.component';
 
@NgModule({
  declarations: [NavBarComponent, TestErrorComponent, NotfoundComponent, ServerErrorComponent, SectionHeaderComponent, ForbiddenComponent],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule,
    SharedModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  exports: [NavBarComponent, SectionHeaderComponent]
})
export class CoreModule { }
