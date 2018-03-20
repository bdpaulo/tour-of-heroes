import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router'; // holds information about the route to this instance
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {

  @Input() hero: Hero; // annotation becaus this data is coming from external
  constructor(
    private heroService: HeroService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }
  getHero(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id'); // the operator + converts string to a number
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }

}
