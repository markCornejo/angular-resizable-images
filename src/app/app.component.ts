import { Component, ViewChild, OnInit } from '@angular/core';

import { ResizeEvent } from 'angular-resizable-element';
import { sizeImage } from './component/angular-resize/angular-resize.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {

  title = 'prueba1';

  constructor() {}

  ngOnInit(): void {
  }

  /* cambio de tamaño de la imagen*/
  newSize(event: sizeImage) {
    console.log(event);
  }


}
