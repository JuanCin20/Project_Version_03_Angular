import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user-service.service';
@Component({
  selector: 'app-user-component',
  standalone: false,
  styleUrl: './user-component.component.css',
  templateUrl: './user-component.component.html',
})
export class UserComponentComponent implements OnInit {
  users: User[];
  user: User = new User();
  constructor(private userService: UserService) {}

  // constructor() {}

  ngOnInit(): void {
    // this.getUsers();
    /* this.users = [
      {
        userId: 1,
        roleEntities: [
          {
            roleId: 1,
            enumRole: 'Developer',
            roleRegister: '06/04/2025',
          },
        ],
        userDni: 73216070,
        userEmail: 'JuanCin080604@gmail.com',
        userPassword: 'JU@NCIn080604',
        userName: 'Juan Carlos',
        userLastName: 'Aronés Peña',
        userPhone: 959748008,
        userAddress: 'Calle los Milanos 161 Santa Anita',
        userBirth: '08/06/2004',
        userState: true,
        userRegister: '02/04/2025',
        userNotAccountExpired: true,
        userNotAccountBlocked: true,
        userCredentialNotExpired: true,
      },
    ]; */
  }

  private getUsers() {
    this.userService.getUsersList().subscribe((data) => {
      this.users = data;
      console.log(data);
    });
  }

  saveUser() {
    this.userService.createUser(this.user).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    console.log(this.user);
    this.saveUser();
  }
}