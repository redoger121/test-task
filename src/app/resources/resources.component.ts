import { Component, OnInit } from '@angular/core';
import { ResourcesService } from './resources.service';
import { Resource } from './resource.model';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css'],
})
export class ResourcesComponent implements OnInit {
  resources: Resource[] = [];
  constructor(private resourcesService: ResourcesService) {}
  ngOnInit(): void {
    this.resourcesService.getResorces().subscribe((response) => {
      this.resources = response;
    });
  }
}
