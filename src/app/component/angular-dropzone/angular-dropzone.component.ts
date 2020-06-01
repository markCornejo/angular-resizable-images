import { Component, OnInit, ViewChild } from '@angular/core';
import { DropzoneConfigInterface, DropzoneComponent } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-angular-dropzone',
  templateUrl: './angular-dropzone.component.html',
  styleUrls: ['./angular-dropzone.component.css']
})
export class AngularDropzoneComponent implements OnInit {

  public config: DropzoneConfigInterface = {
    clickable: true,
    // maxFiles: 2,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    previewsContainer: '.images-list',
    thumbnailWidth: 240,
    thumbnailHeight: 240,
    /*
    addRemoveLinks: true,
    dictCancelUpload: 'Eliminalo yaaa',
    dictCancelUploadConfirmation: 'ya estoy elimando we',
    */
    dictRemoveFile: 'Eliminando la imagen',
    dictRemoveFileConfirmation: '¿Está seguro que desea elimina la imagen?',

  };

  @ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;

  constructor() { }

  ngOnInit(): void {
    /* colocar esta opcion para que funcione despues de cargar el .html*/
    this.config.previewTemplate = document.getElementById('preview-template').innerHTML;
    /*
    this.config.renameFile = (file) => {
      return 'hola';
    };
    */
  }

  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
    args[0].previewElement.querySelector('.dz-error-mark').classList.remove('d-none');
    args[0].previewElement.querySelector('#btn-view-image-dropzone').remove();
    args[0].previewElement.querySelector('.img-thumbnail-preview').remove();
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
    args[0].previewElement.querySelector('.dz-success-mark').classList.remove('d-none');
    setTimeout(() => {
      args[0].previewElement.querySelector('.dz-progress').classList.add('d-none');
    }, (5000));
  }

  public onRemovedFile(args: any): void {
    console.log('onRemovedFile', args);
  }

  public onInitImage(event: any) {
    console.log('onInitImage:', event);
    event.on('thumbnail', (file) => {
      // console.log(file);
      file.previewElement.querySelector('.img-thumbnail-preview').addEventListener('click', () => {
        // alert(file.name);
      });
      // console.log(file.previewElement.querySelector('#btn-view-image-dropzone'));
      file.previewElement.querySelector('#btn-view-image-dropzone').addEventListener('click', () => {
        // window.open('', '_blank').document.write(file.dataURL);
        window.open('', '_blank').document.body.innerHTML = '<img src="' + file.dataURL + '">';
      });

      /*
      file.previewElement.querySelector('#btn-trash-image-dropzone').addEventListener('click', () => {
        alert(file.name + 'trash');
      });
      */
    });

    /*
    event.on('success', (file) => {
        console.log(file);
        const errordiv = document.getElementsByClassName('dz-error-mark') as HTMLCollectionOf<HTMLElement>;
        errordiv[errordiv.length - 2].style.display = 'none'; // The -2 is because there is also one in the preview-template
    });
    */

    /*
    event.on('dz-success', (file) => {
      file.previewElement.previewTemplate;
    });
    */
  }
}
