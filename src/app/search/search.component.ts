import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  constructor(
    private _form: FormBuilder,
  ) {
    this.searchForm = this._form.group({
      search : [null],
    })
   }

  ngOnInit(): void {
  }

  search() {
    console.log(this.searchForm?.get('search')?.value);
    this.searchForm.reset();
  }

}
