import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ResizableModule } from 'angular-resizable-element';
import { AngularResizeComponent } from './component/angular-resize/angular-resize.component';

@NgModule({
  declarations: [
    AppComponent,
    AngularResizeComponent
  ],
  imports: [
    BrowserModule,
    ResizableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
