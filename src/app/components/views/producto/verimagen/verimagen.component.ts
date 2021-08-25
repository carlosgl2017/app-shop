import { Component, OnInit,Inject} from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from '../producto';
@Component({
  selector: 'app-verimagen',
  templateUrl: './verimagen.component.html',
  styleUrls: ['./verimagen.component.css']
})
export class VerimagenComponent implements OnInit {

  constructor(
    public dialogRef:MatDialogRef<VerimagenComponent>,
    @Inject(MAT_DIALOG_DATA) public producto:Producto
  ) { }

  ngOnInit(): void {
  }

  cerrar(){
    this.dialogRef.close();
  }

}
