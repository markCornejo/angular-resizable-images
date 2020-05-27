import { Component } from '@angular/core';

import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prueba1';

  public style: object = {};
  public styleImage: object = {};

  proWidth: number;
  proHeight: number;
  proporcion: number;
  validate: boolean;


  public startRect;
  constructor() {

    this.validate = function(event: ResizeEvent): boolean {
      const MIN_DIMENSIONS_PX: number = 80;
      if (event.rectangle.width < MIN_DIMENSIONS_PX || event.rectangle.height < MIN_DIMENSIONS_PX) {
        return false;
      }

      if (this.startRect) {
        // console.log(event.edges.right, event.edges.bottom, this.startRect, event.edges);
        if(event.edges.right) {
          const widthDiff = event.rectangle.width - this.startRect.width;
          event.rectangle.height = this.startRect.height + widthDiff * (this.startRect.height / this.startRect.width);
          // event.rectangle.bottom = this.startRect.bottom + widthDiff;
        } else if (event.edges.bottom) {
          const widthDiff = event.rectangle.height - this.startRect.height;
          event.rectangle.width = this.startRect.width + widthDiff * (this.startRect.width / this.startRect.height);
        }
      }

      return true;

    }.bind(this);

  }

  /*
  validate(event: ResizeEvent): boolean {
    console.log('evento validate', event);
    const MIN_DIMENSIONS_PX = 200;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }
  */

  onResizeStart(event: ResizeEvent): void {
    this.startRect = event.rectangle;
    // console.log('evento inicio ', event);
    // this.proporcion = event.rectangle.width / event.rectangle.height;
    // this.proWidth = event.rectangle.width;
    // this.proHeight = event.rectangle.height;
  }

  onResizing(event: ResizeEvent): void {
    /*
    console.log('tiempo real', event);

    this.proporcion = event.rectangle.height / event.rectangle.width;

    this.styleImage = {
      width: `${event.rectangle.width * this.proporcion}px`,
      height: `${event.rectangle.height}px`
    };



    console.log(this.styleImage);
    */
  }

  onResizeEnd(event: ResizeEvent): void {
    this.styleImage = {
      // position: 'fixed',
      // left: `${event.rectangle.left}px`,
      // top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`
    };
    /*
    console.log('evento fin ', event);

    if(event.edges.top || event.edges.bottom){
      // console.log("dsdsadsa");
      this.proporcion = this.proHeight / this.proWidth;
      console.log('la proporcion', this.proporcion);
    }

    this.styleImage = {
      //  position: 'fixed',
      // left: `${event.rectangle.left}px`,
      // top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width * this.proporcion}px`,
      height: `${event.rectangle.height}px`
    };
    */
  }

  /*
  onResizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
  }
  */
}
