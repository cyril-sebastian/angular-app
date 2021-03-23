import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"]
})
export class FilterComponent implements OnInit {
  errorMessage: string | undefined;
  selectedFilterName: string | undefined;
  newFilter = {name: 'test'};

  editFilterMode: boolean | undefined;

  constructor() {}

  ngOnInit() {}

  parseAndSaveFilters() {}
  
  isFilterValid() {
    return true;
  }

  saveFilter() {
    this.errorMessage = "";

    if (this.isFilterValid()) {
      this.editFilterMode = true;
      this.selectedFilterName = this.newFilter.name;
      this.parseAndSaveFilters();
    }
  }
}
