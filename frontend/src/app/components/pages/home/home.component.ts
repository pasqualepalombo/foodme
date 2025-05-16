import { Component } from '@angular/core';
import { Food } from '../../../shared/models/Food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgFor, CommonModule } from '@angular/common';
import { StarRatingComponent } from "../../partials/star-rating/star-rating.component";
import { SearchComponent } from "../../partials/search/search.component";
import { TagsComponent } from "../../partials/tags/tags.component";

@Component({
  selector: 'app-home',
  imports: [RouterModule, NgFor, StarRatingComponent, CommonModule, SearchComponent, TagsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  foods:Food[] = []

  constructor(private foodService:FoodService, activatedRoute:ActivatedRoute){
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm) this.foods = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      else if(params.tag) this.foods = this.foodService.getAllFoodsByTag(params.tag);
      else this.foods = foodService.getAll();
    })
  }
  
}
