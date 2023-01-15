import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-brisi-dialog',
  templateUrl: './brisi-dialog.component.html',
  styleUrls: ['./brisi-dialog.component.css']
})
export class BrisiDialogComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<BrisiDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

  odustani(){
    this.dialogRef.close(0);
  }

  potvrdi(){
    this.dialogRef.close(1)
  }

}
