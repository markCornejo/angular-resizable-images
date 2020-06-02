import { Component, ViewChild, OnInit } from '@angular/core';

import { sizeImage } from './component/angular-resize/angular-resize.component';
import { AngularDropzoneComponent } from './component/angular-dropzone/angular-dropzone.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {

  title = 'prueba1';

  closeResult = '';
  src: string = '/assets/78d.png'; // url de la imagen para angular-resize
  initStyle = {
    width: '100%',
    height: '100%'
  }

  constructor(
    private ngbModel: NgbModal
  ) {}

  ngOnInit(): void {
  }

  /* cambio de tamaño de la imagen*/
  newSize(event: sizeImage) {
    console.log(event);
  }

  openDialog() {
    this.ngbModel.open(AngularDropzoneComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl'
    })
    .result.then((result) => {
      this.src = result.dataURL;
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log(reason);
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
