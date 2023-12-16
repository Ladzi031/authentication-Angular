// since every time you want to use some angular material component in our view/template
// you have to import the specific module and "register" it to angular/the framework
// the app.module.ts file get long and "ugly" so by importing all the modules we will need in here...
// and importing them in app.module.ts is a much "cleaner" way to doing things

import { NgModule } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSortModule } from "@angular/material/sort";
import { MatButtonModule } from "@angular/material/button";
@NgModule({
    exports: [
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatRadioModule,
        MatCheckboxModule,
        MatTableModule,
        MatDialogModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule
    ]
})
export class MaterialModule { }