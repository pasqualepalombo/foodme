import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule} from '@angular/router';
import { UserService } from '../../../services/user.service';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';
import { PasswordsMatchValidator } from '../../../shared/validators/password_match_validator';
import { TitleComponent } from "../../partials/title/title.component";
import { TextInputComponent } from "../../partials/text-input/text-input.component";
import { DefaultButtonComponent } from "../../partials/default-button/default-button.component";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  imports: [
    TitleComponent, 
    ReactiveFormsModule, 
    TextInputComponent, 
    DefaultButtonComponent,
    RouterModule
  ]
})
export class RegisterPageComponent implements OnInit {

  registerForm!:FormGroup;
  isSubmitted = false;

  returnUrl = '';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(10)]]
    },{
      validators: PasswordsMatchValidator('password','confirmPassword')
    });

    this.returnUrl= this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;

    const fv= this.registerForm.value;
    const user :IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      address: fv.address
    };

    this.userService.register(user).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }

}