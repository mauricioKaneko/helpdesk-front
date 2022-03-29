import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from './../../../models/chamados';
import { TecnicoService } from './../../../services/tecnico.service';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from './../../../services/cliente.service';
import { ClienteListComponent } from './../../cliente/cliente-list/cliente-list.component';
import { Tecnico } from './../../../models/tecnico';
import { Cliente } from 'src/app/models/cliente';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []
  chamado:Chamado={
    prioridade:'',
    status:'',
    titulo:'',
    descricao:'',
    tecnico:'',
    cliente:'',
    nomeCliente:'',
    nomeTecnico:'',
  }


  prioridade: FormControl = new FormControl(null,[Validators.required])
  status:     FormControl = new FormControl(null,[Validators.required])
  titulo:     FormControl = new FormControl(null,[Validators.required])
  descricao:  FormControl = new FormControl(null,[Validators.required])
  tecnico:    FormControl = new FormControl(null,[Validators.required])
  cliente:    FormControl = new FormControl(null,[Validators.required])

  constructor(
    private clienteService:ClienteService,
    private chamadoService:ChamadoService,
    private tecnicoService:TecnicoService,
    private toastrService:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }
  create():void{
    this.chamadoService.create(this.chamado).subscribe(resposta=>{
      this.toastrService.success('Chamado criado com sucesso', 'Novo chamado');
      this.router.navigate(['chamados']);
    }, ex=> {
      this.toastrService.error(ex.error.error)}
    )
  }
  findAllClientes():void{
    this.clienteService.findall().subscribe(resposta=>{
      this.clientes = resposta;
    })
  }

  findAllTecnicos():void{
    this.tecnicoService.findall().subscribe(resposta=>{
      this.tecnicos = resposta;
    })
  }

  validaCampos():boolean{
    return this.prioridade.valid &&
           this.status.valid &&
           this.titulo.valid &&
           this.descricao.valid &&
           this.tecnico.valid &&
           this.cliente.valid

  }

}
