import { CommonModule, VERSION as ngVersion } from '@angular/common';
import { ApplicationRef, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { VERSION as ngMaterialVersion } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxsHmrLifeCycle, NgxsHmrSnapshot as Snapshot } from '@ngxs/hmr-plugin';
import { NgxsModule, StateContext } from '@ngxs/store';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components';
import { HomeContainerComponent } from './containers';
import { HomeState } from './state/home.state';



const MATERIAL = [
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatTreeModule,
    MatBadgeModule
];

const COMPONENTS = [
    TodoListComponent,
    HomeContainerComponent
];

@NgModule({
    declarations: [AppComponent, ...COMPONENTS],

    imports: [
        ...MATERIAL,

        BrowserAnimationsModule,
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,

        NgxsModule.forRoot([HomeState])
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule implements NgxsHmrLifeCycle<Snapshot> {
    constructor(public appRef: ApplicationRef) {
        console.log('@angular/core', ngVersion.full);
        console.log('@angular/material', ngMaterialVersion.full);
    }

    public hmrNgxsStoreOnInit(ctx: StateContext<Snapshot>, snapshot: Partial<Snapshot>) {
        ctx.patchState(snapshot);
    }

    public hmrNgxsStoreBeforeOnDestroy(ctx: StateContext<Snapshot>): Partial<Snapshot> {
        return ctx.getState();
    }
}
