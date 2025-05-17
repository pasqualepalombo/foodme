import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../shared/models/Food';
import { StarRatingComponent } from "../../partials/star-rating/star-rating.component";
import { NgFor, CommonModule, NgIf} from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';

@Component({
  selector: 'app-food-page',
  imports: [StarRatingComponent, RouterModule, NgFor, CommonModule, NotFoundComponent, NgIf],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent {
  food!: Food;
  constructor(activatedRoute:ActivatedRoute, foodService:FoodService, private cartService:CartService, private router:Router){
    activatedRoute.params.subscribe((params) => {
      if(params.id) this.food = foodService.getFoodById(params.id);
    })
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
