import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);

  form = this.formBuilder.group({
    authorization: ['', [Validators.required]],
  });

  onLogin() {
    if (this.form.valid) {
      const authKey = this.form.get('authorization')!.value;
      if (authKey) {
        this.authService.setAuthKey(authKey);
      }
      this.router.navigate(['/products']);
    }
  }
}
