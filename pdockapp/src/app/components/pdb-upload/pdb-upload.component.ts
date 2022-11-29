import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Payload } from 'src/app/interfaces/payload';
import { ResiduePair } from 'src/app/interfaces/residue_pair';
import { FileDownloadService } from 'src/app/services/file-download.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
@Component({
  selector: 'app-pdb-upload',
  templateUrl: './pdb-upload.component.html',
  styleUrls: ['./pdb-upload.component.css']
})
export class PdbUploadComponent implements OnInit {

  residues: Payload[] =[];
  response=[]
  dataSource = new MatTableDataSource<Payload>(this.residues);
  

  table_columns : string[] = ["pay_01","pay_02","pay_03","pay_04","pay_05","pay_06","pay_07"];
  payload:Payload={
    pay_01: '',
    pay_02: '',
    pay_03: '',
    pay_04: '',
    pay_05: '',
    pay_06: '',
    pay_07: '',
    pay_08: '',
    pay_09: '',
    pay_10: ''
  };
  residuePair:ResiduePair[]=[]

  pdockQ="";
  ppv="";
  interaction="";
  message="";
  errorMessage="";
  error=false;
  loading: boolean = false; 
  file!: File; 

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  diameter=40;




  @ViewChild(MatSort) sort!: MatSort;
  blob!: Blob;

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

constructor(private fileUploadService: FileUploadService,private fileDownloadService:FileDownloadService) { }

ngOnInit(): void {
}

onChange(event:any) {
  this.error=false;
  this.file = event.target!.files[0];
  this.onUpload();
}

onUpload(): void {
    this.loading = !this.loading;
    this.error=false;
    this.errorMessage=""
    this.message="";
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe(
        (event: any) => {
            if (typeof (event) === 'object') {
              
                if (event.pay_01=="false"){
                  this.errorReset()
                  return;
                }
                this.errorMessage=""
                this.error=false;
                this.loading = false; 
                this.response=event;
                this.residues=event;
              
                this.payload=this.residues[this.residues.length-1];

                this.pdockQ=this.payload.pay_01;
                this.ppv=this.payload.pay_02;
                this.interaction=this.payload.pay_03;

                this.message="pDockQ="+this.pdockQ+"\tppv="+this.ppv+"\tProbable interaction?: "+this.interaction;

                this.residues.pop();

                this.dataSource = new MatTableDataSource(this.residues);
                this.dataSource.sort = this.sort; 
                this.dataSource.paginator = this.paginator;
              
            }
        }, err =>{
              this.errorReset();
        }
    );
}


isValid(){

}
errorReset(){
  this.message="";
  this.error=true;
  this.errorMessage="File does not contain only two chains."
  this.loading=false;
  this.residues=[]
  this.dataSource = new MatTableDataSource(this.residues);
}


downloadResults(){
  let payloadArray:Payload[]=[];
  payloadArray=this.residues;

  this.fileDownloadService.download(payloadArray).subscribe(
    (res:any)=>{
      this.blob = new Blob([res], {type: 'text/csv'});
      let downloadURL = window.URL.createObjectURL(res);
      let link = document.createElement('a');
      link.href = downloadURL;
      let csv_name=this.file.name.split(".")[0]
      link.download = csv_name+"_pd_"+this.pdockQ+"_"+this.interaction+"_interactions.csv";
      link.click();
    },
    err=>{
      console.log(err);
    }
  )

}

}
