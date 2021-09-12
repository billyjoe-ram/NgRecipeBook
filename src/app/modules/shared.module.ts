import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlertComponent } from "../components/alert/alert.component";
import { LoadingSpinner } from "../components/loading-spinner/loading-spinner.component";

import { DropdownDirectiveDirective } from "../directives/dropdown-directive.directive";
import { PlaceHolderDirective } from "../directives/placeholder.directive";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        LoadingSpinner,
        AlertComponent,
        DropdownDirectiveDirective,
        PlaceHolderDirective,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
    ],
    exports: [
        LoadingSpinner,
        AlertComponent,
        DropdownDirectiveDirective,
        PlaceHolderDirective,
        CommonModule,
        RouterModule,
        FormsModule,
    ]
})
export class SharedModule { }