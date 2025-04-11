import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Role } from '../role';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  Form_User: FormGroup;
  constructor(private userService: UserService) {}

  // constructor() {}

  ngOnInit(): void {
    this.Form_User = new FormGroup({
      userDni: new FormControl('', Validators.required),
      userEmail: new FormControl('', Validators.required),
      userPassword: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      userLastName: new FormControl('', Validators.required),
      userPhone: new FormControl('', Validators.required),
      userAddress: new FormControl('', Validators.required),
      userBirth: new FormControl('', Validators.required),
    });
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
    var Test_roleId = (<HTMLInputElement>(
      document.getElementById('roleEntities')
    )).value;
    var Alternative_userBirth = (<HTMLInputElement>(
      document.getElementById('userBirth')
    )).value;
    this.user.userBirth = Alternative_userBirth;
    console.log(this.user);
    this.Form_User.setValue({
      userDni: this.user.userDni == undefined ? 0 : this.user.userDni,
      userEmail: this.user.userEmail == undefined ? '' : this.user.userEmail,
      userPassword:
        this.user.userPassword == undefined ? '' : this.user.userPassword,
      userName: this.user.userName == undefined ? '' : this.user.userName,
      userLastName:
        this.user.userLastName == undefined ? '' : this.user.userLastName,
      userPhone: this.user.userPhone == undefined ? 0 : this.user.userPhone,
      userAddress:
        this.user.userAddress == undefined ? '' : this.user.userAddress,
      userBirth: this.user.userBirth == '' ? '' : this.user.userBirth,
    });
    console.log(this.Form_User.value);
    if (Test_roleId == '0') {
      return;
    } else {
      if (this.Form_User.invalid) {
        return;
      } else {
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
  }
}