import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MicrosoftSecurityUpdates, TypeAlert } from '../models/interfaces';
import { SearchMsuService } from '../services/search-msu.service';

@Component({
  selector: 'app-search-msu',
  templateUrl: './search-msu.component.html',
  styleUrls: ['./search-msu.component.css']
})
export class SearchMsuComponent implements OnInit {

  pageSearch: number = 0;
  totalPagesOfPagination: number[] = [];

  microsoftSecurityUpdatesList: MicrosoftSecurityUpdates[] = [];

  formSearchSecurityUpdates: FormGroup = new FormGroup({
    idMicrosoft: new FormControl(''),
    documentTitle: new FormControl(''),
    initialReleaseDate: new FormControl(''),
    currentReleaseDate: new FormControl(''),
  });

  errorMessage: String = "";
  typeAlert: TypeAlert = '';

  constructor(private service: SearchMsuService) { }

  ngOnInit(): void { }

  getAllMicrosoftSecurityLogs(isNewSearch: Boolean) {
    this.errorMessage = "";

    let initialReleaseDate = this.formSearchSecurityUpdates.get("initialReleaseDate")?.value ? this.formSearchSecurityUpdates.get("initialReleaseDate")?.value : '';
    let currentReleaseDate = this.formSearchSecurityUpdates.get("currentReleaseDate")?.value ? this.formSearchSecurityUpdates.get("currentReleaseDate")?.value : '';

    let filterLogs: MicrosoftSecurityUpdates = {
      id_ms_log: this.formSearchSecurityUpdates.get("idMicrosoft")?.value,
      documentTitle: this.formSearchSecurityUpdates.get("documentTitle")?.value,
      initialReleaseDate: initialReleaseDate,
      currentReleaseDate: currentReleaseDate
    };

    if(isNewSearch) {
      this.pageSearch = 0;
    }

    this.service.getAll(this.pageSearch, filterLogs).subscribe({
      next: (data) => {
        this.microsoftSecurityUpdatesList = data.content;
  
        this.microsoftSecurityUpdatesList.forEach(securityLog => {
          securityLog.initialReleaseDate = new Date(securityLog.initialReleaseDate + " 01:00:00").toLocaleDateString();
          securityLog.currentReleaseDate = new Date(securityLog.currentReleaseDate + " 01:00:00").toLocaleDateString();
        });
  
        this.setTotalSearchPages(data.totalPages);
  
        if(this.microsoftSecurityUpdatesList.length == 0) {
          this.showMessageAlert("Não foi encontrado nenhum registro com os filtros que foram preenchidos", 'warning');
        }
      },
      error: () => {
        this.showMessageAlert("Ocorreu um erro ao buscar os logs de atualização de segurança da Microsoft", 'danger');
      }
    });
  }

  clearMicrosoftSecurityLogs() {
    this.microsoftSecurityUpdatesList = [];
    this.pageSearch = 0;
    this.errorMessage = "";

    this.formSearchSecurityUpdates.reset();
    this.formSearchSecurityUpdates.get("idMicrosoft")?.setValue("");
    this.formSearchSecurityUpdates.get("documentTitle")?.setValue("");
  }

  setTotalSearchPages(totalPages: number) {
    this.totalPagesOfPagination = [];

    for (let index = 0; index < totalPages; index++) {
      this.totalPagesOfPagination.push(index);
    }
  }

  setPageSearch(numberPage: number) {
    let isValidNumberPage = numberPage < this.totalPagesOfPagination.length && numberPage >= 0;

    if(isValidNumberPage) {
      this.pageSearch = numberPage;
      this.getAllMicrosoftSecurityLogs(false);
    }
  }

  showMessageAlert(message: String, typeAlert: TypeAlert) {
    this.errorMessage = message;
    this.typeAlert = typeAlert;
  }
}
