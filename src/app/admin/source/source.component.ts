import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NewSource, Source, SourceService } from 'src/app/services/source.service';

@Component({
  selector: 'app-user',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {
  sources: Source[] = [];
  model_new_source: NewSource = new NewSource();
  model_update_source: Source = new Source();

  constructor(private sourceService: SourceService) { }

  setSourceToUpdate(source: Source) {
    this.model_update_source = Object.assign({}, source);
  }

  callbackCreate = (): Observable<any> => {
    return this.sourceService.new(this.model_new_source).pipe(
      tap(res => {
        this.sources.push(res);
      })
    );
  }

  callbackUpdate = (): Observable<any> => {
    return this.sourceService.update_by_id(this.model_update_source).pipe(
      tap(res => {
        // Replace stock object
        let i = this.sources.findIndex(item => item.source_id == this.model_update_source.source_id);
        this.sources.splice(i, 1, res);
      })
    );
  }

  ngOnInit() {
    this.sourceService.get_all().subscribe((res) => this.sources = res);
  }
}