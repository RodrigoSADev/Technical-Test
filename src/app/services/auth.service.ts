import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authKey: string = '';

  setAuthKey(key: string) {
    this.authKey = key;
  }

  getAuthKey(): string {
    return this.authKey;
  }
}
