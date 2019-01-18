import { NgModule } from '@angular/core';
import { PostComponent } from './post/post';
import { CommonModule } from '@angular/common';
import { UkmBoblaHvitComponent } from './ukm-bobla-hvit/ukm-bobla-hvit';
import { UkmKnappComponent } from './ukm-knapp/ukm-knapp';
import { TestComponent } from './test/test';
import { AccordionComponent } from './accordion/accordion';
@NgModule({
    declarations: [PostComponent,
        UkmBoblaHvitComponent,
        UkmKnappComponent,
        TestComponent,
    AccordionComponent],
    imports: [CommonModule],
    exports: [PostComponent,
        UkmBoblaHvitComponent,
        UkmKnappComponent,
        TestComponent,
    AccordionComponent]
})
export class ComponentsModule { }
