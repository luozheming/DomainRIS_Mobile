//tabs的主要跳转界面在这里配置
import { Component, OnInit } from '@angular/core';
import { Hero }                from '../../app/hero';
import { HeroService }         from '../../service/login_DB.service';


@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage implements OnInit {
    errorMessage: string;
    heroes: Hero[];
    mode = 'Observable';
     
    constructor(private heroService: HeroService) {
     }
     
        ngOnInit() { this.getHeroes();
         }

        getHeroes() {
          this.heroService.getHeroes()
                           .subscribe(
                             heroes => this.heroes = heroes,
                             error =>  {console.log(this.errorMessage)});
        }

        addHero(name: string) {
          if (!name) { return; }
          this.heroService.create(name)
                           .subscribe(
                             hero  => this.heroes.push(hero),
                             error =>  this.errorMessage = <any>error);
          this.checklogin(name);
        }

        checklogin(name: string){
        if (!name) { return; }
        else{
            console.log(this.heroes);
        }

        }
}
