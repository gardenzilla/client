import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { RouterParamService } from 'src/app/services/router-param/router-param.service';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RepositoryShort } from 'src/app/class/repository';

@Component({
  selector: 'pos-repository-layout',
  templateUrl: './pos-layout.component.html',
  styleUrls: ['./pos-layout.component.sass']
})
export class PosLayoutComponent implements OnInit {

  routerObserver: Subscription = null;
  repositoryName: String = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private params: RouterParamService
  ) {

    this.routerObserver = router.events.subscribe((e: Event) => {
      /**
       * IF Router Event
       */
      if (e instanceof NavigationEnd) {
        let repository_id = this.params.routerParams()["repository_id"];
        if (repository_id) {
          this.http.get<RepositoryShort>("/repository/" + repository_id).subscribe(val => this.repositoryName = val.name);
        }
      }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() { }

}