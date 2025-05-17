import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartQuantiy = 0;
  constructor(cartService:CartService){
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantiy = newCart.totalCount;
    })
  }
}
