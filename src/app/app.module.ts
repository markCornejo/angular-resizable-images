import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ResizableModule } from 'angular-resizable-element';
import { AngularResizeComponent } from './component/angular-resize/angular-resize.component';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AngularDropzoneComponent } from './component/angular-dropzone/angular-dropzone.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatDialogModule} from '@angular/material/dialog';
import { NgbModule, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

export const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*',
  createImageThumbnails: true,
 };
/*
  <div class="dz-details" (click)="prueba2();">
    <div class="dz-filename"><span data-dz-name></span></div>
    <div class="dz-size" data-dz-size></div>
    <img data-dz-thumbnail />
  </div>
  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
  <div class="dz-success-mark"><span>✔</span></div>
  <div class="dz-error-mark"><span>✘</span></div>
  <div class="dz-error-message"><span data-dz-errormessage></span></div>
*/
@NgModule({
  declarations: [
    AppComponent,
    AngularResizeComponent,
    AngularDropzoneComponent
  ],
  imports: [
    BrowserModule,
    ResizableModule,
    DropzoneModule,
    BrowserAnimationsModule,
    NgbModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    },
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
