import { TecnicoService } from './../../../services/tecnico.service';
import { Tecnico } from './../../../models/tecnico';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {
  ELEMENT_DATA: Tecnico[] =[]
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private service: TecnicoService
  ) { }

  ngOnInit(): void {
    this.findall();
  }

  findall(){
    this.service.findall().subscribe(resposta=>{
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
    })
  }

}

