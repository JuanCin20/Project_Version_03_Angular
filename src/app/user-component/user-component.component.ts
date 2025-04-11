import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Role } from '../role';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-user-component',
  standalone: false,
  styleUrl: './user-component.component.css',
  templateUrl: './user-component.component.html',
})
export class UserComponentComponent implements OnInit {
  users: User[];
  roles: Role[];
  Alternative_roleId: number;
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
    this.getRoles();
  }

  private getUsers() {
    this.userService.getUsersList().subscribe((data) => {
      this.users = data;
      console.log(data);
    });
  }

  private getRoles() {
    this.userService.getRolesList().subscribe((data) => {
      this.roles = data;
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
    debugger;
    const Alternative_Role_Array: Role[] = [];
    for (let i = 0; i < this.roles.length; i++) {
      if (this.Alternative_roleId == this.roles[i].roleId) {
        Alternative_Role_Array.push(this.roles[i]);
      }
    }
    this.user.roleEntities = Alternative_Role_Array;
    console.log(this.user);
    this.saveUser();
  }
}