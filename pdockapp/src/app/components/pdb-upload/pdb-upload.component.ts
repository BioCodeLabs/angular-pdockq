import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
@Component({
  selector: 'app-pdb-upload',
  templateUrl: './pdb-upload.component.html',
  styleUrls: ['./pdb-upload.component.css']
})
export class PdbUploadComponent implements OnInit {

// Variable to store shortLink from api response
message: string = "";
loading: boolean = false; // Flag variable
file!: File; // Variable to store file

constructor(private fileUploadService: FileUploadService) { }

ngOnInit(): void {
}

onChange(event:any) {
  this.file = event.target!.files[0];
}

// OnClick of button Upload
onUpload(): void {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe(
        (event: any) => {
            if (typeof (event) === 'object') {

                this.loading = false; // Flag variable 
                this.message=event.message;
                console.log(event)
            }
            
        }
    );
}


}
