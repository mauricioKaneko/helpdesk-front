
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../../services/cliente.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente:Cliente={
    id:'',
    nome:'',
    cpf:'',
    email:'',
    senha:'',
    perfis:[],
    dataCriacao:''
 }

nome: FormControl = new FormControl(null, Validators.minLength(3));
cpf: FormControl = new FormControl(null, Validators.required);
email: FormControl = new FormControl(null, Validators.email);
senha: FormControl = new FormControl(null, Validators.minLength(3));

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

update():void{
  this.service.update(this.cliente).subscribe(resposta=>{
    this.toast.success('Cliente Atualizado com sucesso','Update');
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

addPerfil(perfil: any):void{

  if(this.cliente.perfis.includes(perfil)){
    this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil),1)
    console.log(this.cliente.perfis);
  }else{
    this.cliente.perfis.push(perfil);
    console.log(this.cliente.perfis);
  }
}

validaCampos():boolean{
  return this.nome.valid && this.cpf.valid &&
         this.email.valid && this.senha.valid
}

}
