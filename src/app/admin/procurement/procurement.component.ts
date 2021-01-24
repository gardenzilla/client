import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NewProcurement, ProcurementInfo, ProcurementService } from 'src/app/services/procurement.service';
import { SourceService } from 'src/app/services/source.service';

@Component({
  selector: 'app-user',
  templateUrl: './procurement.component.html',
  styleUrls: ['./procurement.component.scss']
})
export class ProcurementComponent implements OnInit {
  procurements: ProcurementInfo[] = [];
  model_new_procurement: NewProcurement = new NewProcurement();
  sources: any = {};

  constructor(
    private procurementService: ProcurementService,
    private sourceService: SourceService
  ) { }

  resetModelNewProcurement() {
    this.model_new_procurement = new NewProcurement();
  }

  getStatusString(status: string): string {
    switch (status) {
      case 'New':
        return "Új";
      case 'Ordered':
        return "Megrendelve";
      case 'Arrived':
        return "Beérkezett";
      case 'Processing':
        return "Feldolgozás alatt";
      case 'Closed':
        return "Feldolgozva";
      default:
        return "?";
    }
  }

  callbackCreate = (): Observable<any> => {
    this.model_new_procurement.source_id = +this.model_new_procurement.source_id; // convert string to int
    return this.procurementService.new(this.model_new_procurement).
      pipe(
        tap(res => {
          this.loadProcurements();
        })
      );
  }

  loadSource() {
    this.sourceService.get_all().subscribe(res => {
      res.forEach(res => {
        this.sources[res.source_id] = res
      })
    });
  }

  loadProcurements() {
    this.procurementService.get_all().subscribe(res => {
      this.procurementService.get_bulk(res).subscribe(res => {
        this.procurements = res;
        this.loadSource();
      });
    });
  }

  ngOnInit() {
    this.loadProcurements();
  }
}