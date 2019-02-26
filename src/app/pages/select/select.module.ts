import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectPage } from './select.page';
import { CommonComponentsModule } from 'src/app/modules/common-components/common-components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
	RouterModule.forChild([{ path: '', component: SelectPage }]),
	CommonComponentsModule
  ],
  declarations: [SelectPage]
})
export class SelectPageModule {}
