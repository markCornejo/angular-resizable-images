import { Component, OnInit, ViewChild } from '@angular/core';
import { DropzoneConfigInterface, DropzoneComponent } from 'ngx-dropzone-wrapper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-angular-dropzone',
  templateUrl: './angular-dropzone.component.html',
  styleUrls: ['./angular-dropzone.component.css']
})
export class AngularDropzoneComponent implements OnInit {

  dataExample = environment.dataimage; // data ejemplo para cargar imagenes
  datainit: any; // informacion inicial y total de la instancia dropzone


  public config: DropzoneConfigInterface = {
    clickable: true,
    // maxFiles: 2,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    previewsContainer: '.images-list-dropzone',
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

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

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
    args[0].previewElement.querySelector('.img-dropzone-loading').classList.add('d-none');
    args[0].previewElement.querySelector('.img-thumbnail-preview').classList.remove('d-none');
    setTimeout(() => {
      args[0].previewElement.querySelector('.dz-progress').classList.add('d-none');
    }, (5000));
  }

  public onRemovedFile(args: any): void {
    // console.log('onRemovedFile', args);
  }

  public onAddedFile(args: any): void {
    console.log('onAddedFile', args);
    args.previewElement.querySelector('.dz-progress').classList.remove('d-none');
    /*
    console.log(this.componentRef.files);
    */
    const docutags = document.getElementById('images-list-dropzone').querySelectorAll('.dz-preview');
    const docDoc = Array.from(docutags);
    const arrUlti = docDoc[docDoc.length - 1];

    docutags[docDoc.length - 1].parentNode.removeChild(docutags[docDoc.length - 1]);

    docDoc.pop();
    docDoc.splice(1, 0, arrUlti);

    // tslint:disable-next-line: max-line-length
    document.getElementById('images-list-dropzone').insertBefore(arrUlti, document.getElementById('images-list-dropzone').firstChild);

    const prueba = [...this.datainit.files];
    // console.log(this.datainit.getAcceptedFiles());
    /*
    this.datainit.removeAllFiles();
    this.datainit.files = prueba.reverse();
    this.datainit.processQueue();
    */
  }

  public onInitImage(event: any) {
    console.log('onInitImage:', event);
    this.datainit = event;


    this.datainit.on('thumbnail', (file) => {
      // console.log(file);
      file.previewElement.querySelector('.img-thumbnail-preview').addEventListener('click', () => {
        // alert(file.name);
        this.activeModal.close(file);
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
    this.getImagesStore(0);
  }

  // Aqui colocar servicio de GET obtener imagenes
  getImagesStore(ind: number) {
    // this.config.
    // console.log(this.dataExample);

    // aqui colocar el servicio que desvuelve las imagenes
    for (let index = ind; index < 4; index++) {
      // this.datainit.options.addedfile.call(this.datainit, this.dataExample[index]);
      this.datainit.emit('addedfile', this.dataExample[index]);
      this.datainit.files.push(this.dataExample[index]);
      this.datainit.emit('thumbnail', this.dataExample[index], this.dataExample[index].dataURL);
      this.datainit.emit('complete', this.dataExample[index]);
      this.datainit.files[index].previewElement.querySelector('.img-dropzone-loading').classList.add('d-none');
      this.datainit.files[index].previewElement.querySelector('.img-thumbnail-preview').classList.remove('d-none');
    }

    /*
    this.dataExample.forEach((el) => {
      // console.log(el.url);
      this.datainit.options.addedfile.call(this.datainit, el);
      this.datainit.options.thumbnail.call(this.datainit, el, el.url);
    });
    */
  }

  vermas() {
    this.getImagesStore(0);
  }


}
