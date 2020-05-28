import { Component } from '@angular/core';

import { ResizeEvent } from 'angular-resizable-element';
import { sizeImage } from './component/angular-resize/angular-resize.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'prueba1';

  constructor() {
  }

  newSize(event: sizeImage){
    console.log(event);
  }



}
