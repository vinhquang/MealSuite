import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
  ],
  providers: [
  ],
  exports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
  ]
})

export class SharedModule {}