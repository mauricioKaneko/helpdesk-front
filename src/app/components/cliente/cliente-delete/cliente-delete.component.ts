import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from './../../../models/cliente';
import { ClienteService } from './../../../services/cliente.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {


  cliente:Cliente={
    id:'',
    nome:'',
    cpf:'',
    email:'',
    senha:'',
    perfis:[],
    dataCriacao:''
 }

constructor(
  private service: ClienteService,
  private toast: ToastrService, 
  private router: Router,
  private route: ActivatedRoute
  ) {
  
 }

ngOnInit(): void { 
  this.cliente.id = this.route.snapshot.paramMap.get('id');
  this.findbyid();
}

findbyid(){
  this.service.findbyid(this.cliente.id).subscribe(resposta=>{
    resposta.perfis = [];
    this.cliente = resposta;
  })
}

delete():void{
  this.service.delete(this.cliente.id).subscribe(resposta=>{
    this.toast.success('Cliente Deletado com sucesso','Delete');
    this.router.navigate(['clientes']);
  }, ex=>{      
    if(ex.error.erros){
      ex.error.errors.forEach(element => {
        this.toast.error(element.message);
      });
    }else{
      this.toast.error(ex.error.message);
    }
    
  });
}


}
