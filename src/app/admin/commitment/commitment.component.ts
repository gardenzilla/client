import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { mergeMap } from 'rxjs/operators';
import { CommitmentService, CustomerInfo, PurchaseInfo } from 'src/app/services/commitment.service';
import { Customer, CustomerService } from 'src/app/services/customer/customer.service';
import { ModalComponent } from '../partial/modal/modal.component';

@Component({
  selector: 'app-commitment',
  templateUrl: './commitment.component.html',
  styleUrls: ['./commitment.component.css']
})
export class CommitmentComponent implements OnInit {

  constructor(
    private customerService: CustomerService,
    private commitmentService: CommitmentService
  ) { }

  customers_with_commitments: Customer[] = [];

  customer_details: CustomerInfo | null = null;

  purchase_info: PurchaseInfo[] = [];

  customer_search_result_list: Customer[] = [];

  new_commitment_customer_id: number | null = null;

  new_commitment_form = new FormGroup(
    {
      target: new FormControl(''),
      discount_percentage: new FormControl('')
    }
  );

  searchCustomers(query: string) {
    this.customer_search_result_list = [];
    this.customerService.find(query).pipe(
      mergeMap(ids => this.customerService.get_bulk(ids))
    ).subscribe(
      res => this.customer_search_result_list = res
    );
  }

  loadCustomers() {
    this.commitmentService.get_all().pipe(
      mergeMap(customer_ids => this.customerService.get_bulk(customer_ids))
    ).subscribe(customers => this.customers_with_commitments = customers);
  }

  loadCustomerCommitment(customer_id: number) {
    this.commitmentService.get_by_id(customer_id).subscribe(
      customer_info => this.customer_details = customer_info
    );
  }

  @ViewChild('modal_new_commitment') modalNew: ModalComponent;
  addCommitment() {
    if (!this.new_commitment_customer_id) {
      return false;
    }
    this.commitmentService.add_commitment(this.new_commitment_customer_id, this.new_commitment_form.value.target, this.new_commitment_form.value.discount_percentage).subscribe(
      customer => {
        this.customer_details = customer;
        this.modalNew.close();
        this.loadCustomers();
      }
    );
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

}
