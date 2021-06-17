import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mensaje-confirmacion',
  templateUrl: './mensaje-confirmacion.component.html',
  styleUrls: ['./mensaje-confirmacion.component.css']
})
export class MensajeConfirmacionComponent implements OnInit {

  mensaje:string;
  btn='aceptar';
  constructor(public dialogRef: MatDialogRef<MensajeConfirmacionComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.mensaje=data.mensaje;
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
