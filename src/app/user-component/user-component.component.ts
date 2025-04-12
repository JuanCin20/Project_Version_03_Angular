import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { OnInit } from '@angular/core';
import { User } from '../user';
import { Role } from '../role';
import { FormGroup } from '@angular/forms';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { UserService } from '../user-service.service';
import { Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-user-component',
  standalone: false,
  styleUrl: './user-component.component.css',
  templateUrl: './user-component.component.html',
})
export class UserComponentComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  users: User[];
  roles: Role[];
  roleId: number;
  user: User = new User();
  Form_User: FormGroup;
  characters: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  dtElement: DataTableDirective;
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private userService: UserService, private renderer: Renderer2) {}

  // constructor() {}

  ngOnInit(): void {
    this.dtOptions = {
      lengthMenu: [5, 10, 20, 50],
    };
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.userService.getUsersList().subscribe((result) => {
          callback({
            data: result,
          });
        });
      },
      lengthMenu: [5, 10, 20, 50],
      columns: [
        { title: 'ID:', data: 'userId' },
        {
          title: 'Role:',
          data: null,
          render: (data: any, type: any, row: any) => {
            var Result = '';
            for (let i = 0; i < data.roleEntities.length; i++) {
              Result += data.roleEntities[i].enumRole + ', ';
            }
            if (Result.slice(0, -2) == 'Developer') {
              return `<span class="badge text-bg-danger">Developer</span>`;
            }
            if (Result.slice(0, -2) == 'Administrator') {
              return `<span class="badge text-bg-primary">Administrator</span>`;
            }
            if (Result.slice(0, -2) == 'Employee') {
              return `<span class="badge text-bg-success">Employee</span>`;
            }
            if (Result.slice(0, -2) == 'Customer') {
              return `<span class="badge text-bg-warning">Customer</span>`;
            }
            return null;
          },
        },
        { title: 'DNI:', data: 'userDni' },
        { title: 'E-Mail:', data: 'userEmail' },
        { title: 'Name:', data: 'userName' },
        { title: 'Last Name:', data: 'userLastName' },
        { title: 'Phone:', data: 'userPhone' },
        { title: 'Address:', data: 'userAddress' },
        { title: 'Birth:', data: 'userBirth' },
        {
          title: 'State:',
          data: null,
          render: (data: any, type: any, row: any) => {
            if (data.userState) {
              return `<span class="badge text-bg-success">Active</span>`;
            } else {
              return `<span class="badge text-bg-danger">Disabled</span>`;
            }
          },
        },
        { title: 'Register:', data: 'userRegister' },
        {
          title: 'Operation',
          data: null,
          orderable: false,
          searchable: false,
          render: (data: any, type: any, row: any) => {
            return `<div class="d-flex flex-row justify-content-start gap-2"><button type="button" class="btn btn-primary Edit_Button"><i class="fa-solid fa-pencil"></i></button><button type="button" class="btn btn-danger Delete_Button"><i class="fa-solid fa-trash"></i></button></div>`;
          },
          className: 'operation-column',
        },
      ],
    };
    this.Form_User = new FormGroup({
      userDni: new FormControl('', Validators.required),
      userEmail: new FormControl('', Validators.required),
      // ? userPassword: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      userLastName: new FormControl('', Validators.required),
      userPhone: new FormControl('', Validators.required),
      userAddress: new FormControl('', Validators.required),
      userBirth: new FormControl('', Validators.required),
    });
    this.getRoles();
  }

  private getRoles(): void {
    this.userService.getRolesList().subscribe((data) => {
      this.roles = data;
      console.log(data); // ? Good 'console.log'
    });
  }

  private ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  private ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public addRow(): void {
    debugger;
    this.user = {
      userId: 100,
      roleEntities: [
        {
          roleId: 1,
          enumRole: 'Developer',
          roleRegister: '06/04/2025',
        },
      ],
      userDni: 100,
      userEmail: 'AAA',
      userPassword: 'AAA',
      userName: 'AAA',
      userLastName: 'AAA',
      userPhone: 100,
      userAddress: 'AAA',
      userBirth: 'AAA',
      userState: true,
      userRegister: 'AAA',
      userNotAccountExpired: true,
      userNotAccountBlocked: true,
      userCredentialNotExpired: true,
    };
    this.users.push(this.user);
    this.rerender();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: any) => {
      dtInstance.destroy();
      this.dtTrigger.next(null);
    });
  }

  private saveUser(): void {
    this.userService.createUser(this.user).subscribe(
      (data) => {
        console.log(data); // ? Good 'console.log'
        // !
      },
      (error) => console.log(error) // ? Good 'console.log'
    );
  }

  private generateUserPassword(length: number): string {
    let userPassword = '';
    const charactersLength = this.characters.length;
    for (let i = 0; i < length; i++) {
      userPassword += this.characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    return userPassword;
  }

  public onSubmit(): void {
    // debugger; // TODO: Debugger Breakpoint
    var roleId = (<HTMLInputElement>document.getElementById('roleId')).value;
    var userBirth = (<HTMLInputElement>document.getElementById('userBirth'))
      .value;
    this.user.userBirth = userBirth;
    console.log(this.user); // ? Good 'console.log'
    this.Form_User.setValue({
      userDni: this.user.userDni == undefined ? 0 : this.user.userDni,
      userEmail: this.user.userEmail == undefined ? '' : this.user.userEmail,
      // ? userPassword: this.user.userPassword == undefined ? '' : this.user.userPassword,
      userName: this.user.userName == undefined ? '' : this.user.userName,
      userLastName:
        this.user.userLastName == undefined ? '' : this.user.userLastName,
      userPhone: this.user.userPhone == undefined ? 0 : this.user.userPhone,
      userAddress:
        this.user.userAddress == undefined ? '' : this.user.userAddress,
      userBirth: this.user.userBirth == '' ? '' : this.user.userBirth,
    });
    console.log(this.Form_User.value); // ? Good 'console.log'
    if (roleId == '0') {
      return;
    } else {
      if (this.Form_User.invalid) {
        return;
      } else {
        const Alternative_Role_Array: Role[] = [];
        for (let i = 0; i < this.roles.length; i++) {
          if (this.roleId == this.roles[i].roleId) {
            Alternative_Role_Array.push(this.roles[i]);
          }
        }
        this.user.userPassword = this.generateUserPassword(10);
        this.user.roleEntities = Alternative_Role_Array;
        console.log(this.user); // ? Good 'console.log'
        this.saveUser();
      }
    }
  }
}