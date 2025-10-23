import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userService } from '../user-services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: false
})
export class UserFormComponent  implements OnInit {

  userForm: FormGroup = new FormGroup ({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    photo: new FormControl(''),
    role: new FormControl('', Validators.required),
  });

  userId!: number;

  constructor(
    private userService: userService,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController 
  ) {
    const userId = this.activatedRoute.snapshot.params['id'];
    if(userId){
      this.userService.getById(userId).subscribe({
        next: (user) => {
          if(user){
            this.userId = userId;
            console.log(user);
            this.userForm.patchValue({
              username: user.username,
              email: user.email,
              photo: user.image,
              role: user.role
            });
          }
        },
        error: (error) => {
          this.toastController.create({
            message: error.error.message,
            header: 'Erro ao carregar usuário!',
            color: 'danger',
            duration: 3000,
          }).then(toast => toast.present())
        }
      })
    }
   }

   async verificaForm(){
    
   }

  ngOnInit() {}

  arquivoSelecionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;

        this.userForm.get('photo')?.setValue(base64String);
      };

      reader.readAsDataURL(file);
    }
  }

  hasError(field: string, error: string) {
    const formControl = this.userForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

}
