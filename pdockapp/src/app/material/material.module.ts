import { NgModule } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSliderModule} from '@angular/material/slider';
import {MatTreeModule} from '@angular/material/tree';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const material = [
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatDividerModule,
  MatNativeDateModule,
  MatRippleModule,
  MatFormFieldModule,
  MatSelectModule,
  MatGridListModule,
  MatProgressBarModule,
  MatInputModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatSliderModule,
  MatTreeModule,
  MatMenuModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatTabsModule,
  MatDialogModule,
  MatToolbarModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatStepperModule,
  MatTooltipModule,
  MatExpansionModule,
  MatSnackBarModule
]


@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
