import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTable } from 'src/app/class/data-table';
import { Customer, CustomerService } from 'src/app/services/customer/customer.service';
import { ErrorService } from 'src/app/services/error/error.service';
import { Account, LoyaltyService } from 'src/app/services/loyalty.service';
import { ModalComponent } from '../partial/modal/modal.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  source_ids: number[] = [];
  source: Map<number, Customer> = new Map();
  page_count: number = 15;
  current_page: number = 1;
  query: string = "";

  customer_selected: Customer | null = null;
  customer_secelted_loyalty_account: Account | null = null;

  constructor(
    private route: ActivatedRoute,
    private customer_service: CustomerService,
    private loyaltyService: LoyaltyService
  ) { }

  find() {
    this.current_page = 0;
    this.source = new Map();
    this.customer_service.find(this.query).subscribe(res => {
      this.source_ids = res;
      this.load();
    });
  }

  load() {
    this.current_page++;
    this.customer_service
      .get_bulk(this.source_ids.slice(
        (this.current_page - 1) * this.page_count, this.page_count * this.current_page))
      .subscribe(res => {
        res.forEach(item => this.source.set(item.id, item));
      });
  }

  selectCustomer(customer: Customer) {
    this.customer_selected = customer;
    this.loadLoyaltyCard(customer.id);
  }

  loadLoyaltyCard(customer_id: number) {
    this.loyaltyService.get_by_customer_id(customer_id).subscribe(
      res => this.customer_secelted_loyalty_account = res
    );
  }

  @ViewChild('modal_create_loyalty_account') modalLoyaltyNew: ModalComponent;
  loyaltyCreate(birthdate: string) {
    this.loyaltyService.new_account(this.customer_selected.id, birthdate).subscribe(
      res => {
        this.customer_secelted_loyalty_account = res;
        this.modalLoyaltyNew.close();
      }
    );
  }

  @ViewChild('modal_add_card') modalAddCard: ModalComponent;
  addCard(card_id: string) {
    this.loyaltyService.set_card(this.customer_secelted_loyalty_account.account_id, card_id).subscribe(
      res => {
        this.customer_secelted_loyalty_account = res;
        this.modalAddCard.close();
      }
    );
  }

  @ViewChild('modal_set_level') modalSetLevel: ModalComponent;
  setAccountLevel(account_level: string) {
    this.loyaltyService.set_loyalty_level(this.customer_secelted_loyalty_account.account_id, account_level).subscribe(
      res => {
        this.customer_secelted_loyalty_account = res;
        this.modalSetLevel.close();
      }
    );
  }

  @ViewChild('modal_set_birthdate') modalSetBirthdate: ModalComponent;
  setAccountBirthdate(birthdate: string) {
    this.loyaltyService.set_birthdate(this.customer_secelted_loyalty_account.account_id, birthdate).subscribe(
      res => {
        this.customer_secelted_loyalty_account = res;
        this.modalSetBirthdate.close();
      }
    );
  }

  ngOnInit() {
    this.source = new Map();
    this.route.data.subscribe((
      data: { "data": { ids: number[], customers: Customer[] } }) => {
      this.source_ids = data.data.ids;
      data.data.customers.forEach(item => {
        this.source.set(item.id, item);
      });
    });
  }
}
