
import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() termChanged:EventEmitter<string>=new EventEmitter();
  myForm: FormGroup;
  formattedMessage: string;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: ''
    });
  
    this.onChanges();
  }

  onChanges(): void {
    this.myForm.get('name').valueChanges.pipe(debounceTime(1000)).subscribe(val => {
      this.formattedMessage = `New search term is ${val}.`;
      console.log(this.formattedMessage);
      this.termChanged.emit(val);
    });
  }

}
