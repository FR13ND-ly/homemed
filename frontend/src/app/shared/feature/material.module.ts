import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  exports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }
