import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async show(message: string, success: 'success' | 'failed' = 'success', position: 'top' | 'middle' | 'bottom' = 'bottom') {
    const toast = await this.toastController.create({
      message: `<div class="toast-content">
                  <img src="assets/icon/icon-teste.png" class="toast-icon" />
                  <span>${message}</span>
                </div>`,
      position,
      cssClass: success ? 'sucess-toast' : 'failed-toast',
      duration: 2000,
      animated: true
    });
    toast.present();
  }
}
