import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  @Output() userName: EventEmitter<any> = new EventEmitter<any>();

  searchForm: FormGroup;
  constructor(
    private _form: FormBuilder,
    private _matSnackBar: MatSnackBar) {
    this.searchForm = this._form.group({
      search: [null],
    });
  }

  ngOnInit(): void {}

  search() {
    const val = this.searchForm?.get('search')?.value;
    if (val) {
      localStorage.setItem('userName', val);
      this.userName.emit(val);
    }else {
      this._matSnackBar.open('Please enter a username!', 'Close', {
        duration: 2000,
        panelClass:['customClass']
      });
    }

    this.searchForm.reset();
  }
}
