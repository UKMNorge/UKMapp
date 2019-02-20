import { NgModule } from '@angular/core';
import { PostComponent } from './post/post';
import { CommonModule } from '@angular/common';
import { UkmBoblaHvitComponent } from './ukm-bobla-hvit/ukm-bobla-hvit';
import { UkmKnappComponent } from './ukm-knapp/ukm-knapp';

import { AccordionComponent } from './accordion/accordion';
import { MorphIconComponent } from './morph-icon/morph-icon';
@NgModule({
    declarations: [PostComponent,
        UkmBoblaHvitComponent,
        UkmKnappComponent,
        MorphIconComponent,
        AccordionComponent],
    imports: [CommonModule],
    exports: [PostComponent,
        UkmBoblaHvitComponent,
        UkmKnappComponent,
        MorphIconComponent,
        AccordionComponent]
})
export class ComponentsModule { }
