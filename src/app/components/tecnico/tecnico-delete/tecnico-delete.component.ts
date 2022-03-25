import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from './../../../models/tecnico';
import { TecnicoService } from './../../../services/tecnico.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {


  tecnico:Tecnico={
    id:'',
    nome:'',
    cpf:'',
    email:'',
    senha:'',
    perfis:[],
    dataCriacao:''
 }

constructor(
  private service: TecnicoService,
  private toast: ToastrService, 
  private router: Router,
  private route: ActivatedRoute
  ) {
  
 }

ngOnInit(): void { 
  this.tecnico.id = this.route.snapshot.paramMap.get('id');
  this.findbyid();
}

findbyid(){
  this.service.findbyid(this.tecnico.id).subscribe(resposta=>{
    resposta.perfis = [];
    this.tecnico = resposta;
  })
}

delete():void{
  this.service.delete(this.tecnico.id).subscribe(resposta=>{
    this.toast.success('Técnico Deletado com sucesso','Delete');
    this.router.navigate(['tecnicos']);
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
