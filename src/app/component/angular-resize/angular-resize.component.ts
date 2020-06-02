import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';

export interface sizeImage {
  width: number;
  height: number;
}

@Component({
  selector: 'app-angular-resize',
  templateUrl: './angular-resize.component.html',
  styleUrls: ['./angular-resize.component.css']
})

export class AngularResizeComponent implements OnInit, OnChanges {

  @Input() src = '';
  @Input() intoClass: any;
  @Input() initStyle: any;
  @Output() newSize = new EventEmitter<sizeImage>();

  public styleImage: object = {};

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

  ngOnInit(): void {
    this.styleImage = this.initStyle;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src.previousValue) {
      this.styleImage = this.initStyle;
    }
  }

  onResizeStart(event: ResizeEvent): void {
    this.startRect = event.rectangle;
  }

  onResizing(event: ResizeEvent): void {}

  onResizeEnd(event: ResizeEvent): void {
    this.styleImage = {
      // position: 'fixed',
      // left: `${event.rectangle.left}px`,
      // top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`
    };

    this.newSize.emit({width: event.rectangle.width, height: event.rectangle.height});
  }



}
