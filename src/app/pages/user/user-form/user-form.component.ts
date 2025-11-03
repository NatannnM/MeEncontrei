import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userService } from '../user-services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from '../models/user.type';
import { AuthService } from 'src/app/services/auth.service';

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
    profile_pic: new FormControl(''),
    role: new FormControl('', Validators.required),
  });

  userId!: string;
  user: User | null = null;
  origin!: string;

  constructor(
    private userService: userService,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.isAuthenticated().subscribe(async isLoggedIn => {
      if(isLoggedIn){
        await this.carregarUsuario();
      }else{
        this.user = undefined as any;
      }
    })
    this.origin = this.activatedRoute.snapshot.params['origin'];
    const userId = this.activatedRoute.snapshot.params['id'];
    if(userId){
      this.userService.getById(userId).subscribe({
        next: (response) => {
          if(response && response.user){
            this.userId = userId;
            this.userForm.setValue({
              username: response.user.username,
              email: response.user.email,
              password: '',
              profile_pic: '',
              role: response.user.role
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

  ngOnInit() {}

  arquivoSelecionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;

        this.userForm.get('profile_pic')?.setValue(base64String);
      };

      reader.readAsDataURL(file);
    }
  }

  async carregarUsuario(){
    try {
      const dadosUsuario = await this.authService.getUserData();
      this.user = dadosUsuario.user;
    } catch(err) {
      console.error('Erro ao carregar dados do usuário', err);
    }
  }

  save() {
    let { value } = this.userForm;
    this.userService.save({
      ...value,
      id: this.userId
    }).subscribe({
      next: () => {
        this.toastController.create({
          message: 'Usuário salvo com sucesso!',
          duration: 3000,
          position: 'bottom',
          cssClass: 'toast-design'
        }).then(toast => toast.present());
        if(this.origin === 'admin'){
            this.router.navigate(['admin']);
          }else{
            this.router.navigate(['/user'])
          }
        
      },
      error: (error) => {
        this.toastController.create({
          message: error.error.message,
          header: 'Erro ao salvar usuário ' + value.username + '!',
          color: 'danger',
          position: 'top',
          duration: 3000,
        }).then(toast => toast.present())
      }
    })
  }

  hasError(field: string, error: string) {
    const formControl = this.userForm.get(field);
    return formControl?.touched && formControl?.errors?.[error]
  }

}
