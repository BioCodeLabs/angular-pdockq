import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Payload } from 'src/app/interfaces/payload';
import { ResiduePair } from 'src/app/interfaces/residue_pair';
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
  

  table_columns : string[] = ["pay_01","pay_02","pay_03","pay_04","pay_05"];
  payload:Payload={
    pay_01: '',
    pay_02: '',
    pay_03: '',
    pay_04: '',
    pay_05: ''
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

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

constructor(private fileUploadService: FileUploadService) { }

ngOnInit(): void {
}

onChange(event:any) {
  this.error=false;
  this.file = event.target!.files[0];
  console.log('size', this.file.size);
   console.log('type', this.file.type);
  this.onUpload();
}

onUpload(): void {
    this.loading = !this.loading;
    this.error=false;
    this.errorMessage=""
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
                console.log(this.residues);
          
                this.payload=this.residues[this.residues.length-1];
                console.log(this.payload);
                this.pdockQ=this.payload.pay_01;
                this.ppv=this.payload.pay_02;
                this.interaction=this.payload.pay_03;


                this.message="pDockQ="+this.pdockQ+"\tppv="+this.ppv+"\tProbable interaction?: "+this.interaction;

                this.residues.pop();

                this.payloadToResiduePair(this.residues);
                console.log(this.residuePair);

                this.dataSource = new MatTableDataSource(this.residues);
                this.dataSource.sort = this.sort; 
                this.dataSource.paginator = this.paginator;
                console.log(this.dataSource);
          
            }
        }, err =>{
              this.errorReset();
        }
    );
}


payloadToResiduePair(payloadArray:Payload[]){
  let i=0;
   for( i=0;i<payloadArray.length-1;i++){
      let res1=payloadArray[i].pay_01;
      let pos1:number=+payloadArray[i].pay_02;
      let res2=payloadArray[i].pay_03;
      let pos2:number=+payloadArray[i].pay_04;
      let dist:number=+payloadArray[i].pay_05;
      console.log(res1);
      
      let residuePairToAdd:ResiduePair={
        residue1: res1,
        position1: pos1,
        residue2: res2,
        position2: pos2,
        distance: dist
      };
      this.residuePair.push(residuePairToAdd);
  }

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


}
