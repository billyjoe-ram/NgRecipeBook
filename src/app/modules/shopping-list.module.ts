import { NgModule } from "@angular/core";
import { SharedModule } from "./shared.module";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";

import { ShoppingEditComponent } from "../components/shopping-list/shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "../components/shopping-list/shopping-list.component";


@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        ShoppingListRoutingModule,
        SharedModule
    ],
    exports: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ]
})
export class ShoppingListModule {}