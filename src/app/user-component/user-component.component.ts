import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { User } from '../user';
import { Role } from '../role';
import { UserService } from '../user-service.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
var User_Table_Start: any = null;
var User_Table_Final: any = null;
var userId: number = 0;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-component',
  standalone: false,
  styleUrl: './user-component.component.css',
  templateUrl: './user-component.component.html',
})
export class UserComponentComponent implements OnInit {
  Url_01: string = 'http://localhost:8080/api/rest/user/all';
  // Url_02: string = 'http://localhost:8080/api/rest/user/allRoleEntities'; // * Alternative
  users: User[];
  usersActive: User[] = [];
  usersDisabled: User[] = [];
  roles: Role[];
  user: User = new User();
  characters: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  constructor(
    private userService: UserService,
    private _toastr: ToastrService
  ) {}

  // constructor() {}

  public Test(): void {
    // debugger; // TODO: Debugger Breakpoint
    alert('Hola Mundo!'); // ! Alert
  }

  ngOnInit(): void {
    // this.Function_User_Table(); // * Alternative
    this.Function_User_Table_Start_01();
    this.Function_User_Table_Start_02();
    this.Function_ComboBox_01();
    // this.Function_ComboBox_02(); // * Alternative
    this.Edit_Delete_Button();
    this.jQuery_Validator();
  }

  /* private Function_User_Table(): void {
    this.userService.getUsersList().subscribe((data) => {
      this.users = data;
      debugger; // TODO: Debugger Breakpoint
      console.log(data); // ? Good 'console.log'
    });
  } */

  private Function_User_Table_Start_01(): void {
    $.ajax({
      url: this.Url_01,
      type: 'GET',
      dataType: 'json',
      dataSrc: '',
      success: function (data: any) {
        // debugger; // TODO: Debugger Breakpoint
        console.log(data); // ? Good 'console.log'
      },
    });
  }

  private Function_User_Table_Start_02(): void {
    User_Table_Start = $('#User_Table_Start').DataTable({
      responsive: true,
      ordering: false,
      ajax: {
        url: this.Url_01,
        type: 'GET',
        dataType: 'json',
        dataSrc: '',
      },
      columns: [
        { data: 'userId' },
        {
          data: 'roleEntities',
          render: function (roleEntities: any) {
            var Result = '';
            for (let i = 0; i < roleEntities.length; i++) {
              Result += roleEntities[i].enumRole + ', ';
            }
            if (Result.slice(0, -2) == 'Developer') {
              return '<span class="badge text-bg-danger">Developer</span>';
            } else {
              if (Result.slice(0, -2) == 'Administrator') {
                return '<span class="badge text-bg-primary">Administrator</span>';
              } else {
                if (Result.slice(0, -2) == 'Employee') {
                  return '<span class="badge text-bg-success">Employee</span>';
                } else {
                  if (Result.slice(0, -2) == 'Customer') {
                    return '<span class="badge text-bg-warning">Customer</span>';
                  }
                }
              }
            }
            return '<span class="badge text-bg-dark">Error</span>';
          },
        },
        { data: 'userDni' },
        { data: 'userEmail' },
        { data: 'userName' },
        { data: 'userLastName' },
        { data: 'userPhone' },
        { data: 'userAddress' },
        { data: 'userBirth' },
        {
          data: 'userState',
          render: function (userState: any) {
            if (userState) {
              return '<span class="badge text-bg-success">Active</span>';
            } else {
              return '<span class="badge text-bg-danger">Disabled</span>';
            }
          },
        },
        { data: 'userRegister' },
        {
          defaultContent:
            '<div class="d-flex flex-row justify-content-start gap-2"><button type="button" class="btn btn-primary Edit_Button"><i class="fa-solid fa-pencil"></i></button><button type="button" class="btn btn-danger Delete_Button"><i class="fa-solid fa-trash"></i></button></div>',
          orderable: false,
          searchable: false,
          width: '90px',
        },
      ],
    });
  }

  private Function_ComboBox_01(): void {
    this.userService.getRolesList().subscribe((data) => {
      this.roles = data;
      console.log(data); // ? Good 'console.log'
    });
  }

  /* private Function_ComboBox_02(): void {
    $.ajax({
      url: this.Url_02,
      type: 'GET',
      dataType: 'json',
      dataSrc: '',
      success: function (data: any) {
        // debugger; // TODO: Debugger Breakpoint
        console.log(data); // ? Good 'console.log'
        $('<option>')
          .attr({ value: '0', disabled: 'true', selected: 'true' })
          .text('Select')
          .appendTo('#roleId');
        $.each(data, function (index: any, item: any) {
          $('<option>')
            .attr({ value: item.roleId })
            .text(item.enumRole)
            .appendTo('#roleId');
        });
      },
    });
  } */

  private Edit_Delete_Button() {
    $(function () {
      function Open_Modal_Form(data: any): void {
        if (data == null) {
          $('#roleId').removeClass('is-valid');
          $('#roleId').removeClass('is-invalid');
          $('#userDni').removeClass('is-valid');
          $('#userDni').removeClass('is-invalid');
          $('#userEmail').removeClass('is-valid');
          $('#userEmail').removeClass('is-invalid');
          $('#userName').removeClass('is-valid');
          $('#userName').removeClass('is-invalid');
          $('#userLastName').removeClass('is-valid');
          $('#userLastName').removeClass('is-invalid');
          $('#userPhone').removeClass('is-valid');
          $('#userPhone').removeClass('is-invalid');
          $('#userAddress').removeClass('is-valid');
          $('#userAddress').removeClass('is-invalid');
          $('#userBirth').removeClass('is-valid');
          $('#userBirth').removeClass('is-invalid');
          userId = 0;
          $('#roleId').val(0);
          $('#userDni').val('');
          $('#userEmail').val('');
          $('#userName').val('');
          $('#userLastName').val('');
          $('#userPhone').val('');
          $('#userAddress').val('');
          $('#userBirth')
            .datepicker({ dateFormat: 'dd/mm/yy', maxDate: '+0D' })
            .datepicker('setDate', '');
        } else {
          if (data != null) {
            $('#roleId').removeClass('is-valid');
            $('#roleId').removeClass('is-invalid');
            $('#userDni').removeClass('is-valid');
            $('#userDni').removeClass('is-invalid');
            $('#userEmail').removeClass('is-valid');
            $('#userEmail').removeClass('is-invalid');
            $('#userName').removeClass('is-valid');
            $('#userName').removeClass('is-invalid');
            $('#userLastName').removeClass('is-valid');
            $('#userLastName').removeClass('is-invalid');
            $('#userPhone').removeClass('is-valid');
            $('#userPhone').removeClass('is-invalid');
            $('#userAddress').removeClass('is-valid');
            $('#userAddress').removeClass('is-invalid');
            $('#userBirth').removeClass('is-valid');
            $('#userBirth').removeClass('is-invalid');
            userId = data.userId;
            $('#roleId').val(data.roleEntities[0].roleId);
            $('#userDni').val(data.userDni);
            $('#userEmail').val(data.userEmail);
            $('#userName').val(data.userName);
            $('#userLastName').val(data.userLastName);
            $('#userPhone').val(data.userPhone);
            $('#userAddress').val(data.userAddress);
            $('#userBirth')
              .datepicker({ dateFormat: 'dd/mm/yy', maxDate: '+0D' })
              .datepicker('setDate', data.userBirth);
          }
        }
        $('#Form_01').modal('show');
      }

      function Selected_Row_Function(data: any): any {
        // ? Get Current Row
        var Selected_Row = $(data).parents('tr');
        // ? Verify if the Current Row is a Secondary Row
        if (Selected_Row.hasClass('child')) {
          // ? If it's Like That, Point the Previous Row (It's "parent")
          Selected_Row = Selected_Row.prev();
        }
        return Selected_Row;
      }

      $('#User_Table_Start tbody').on('click', '.Edit_Button', function () {
        // var Selected_Row = $(this).closest("tr") // ! Not Responsive
        var Selected_Row = Selected_Row_Function(this);
        var data = User_Table_Start.row(Selected_Row).data();
        console.log(data); // ? Good 'console.log'
        Open_Modal_Form(data);
      });

      $('#User_Table_Start tbody').on('click', '.Delete_Button', function () {
        var Selected_Row = Selected_Row_Function(this);
        var data = User_Table_Start.row(Selected_Row).data();
        console.log(data); // ? Good 'console.log'
        Swal.fire({
          title: 'Confirmation',
          text: 'Do you Want to Delete the Selected User?',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Cancel',
          cancelButtonColor: '#FF0000',
          confirmButtonText: 'Delete',
          confirmButtonColor: '#3085D6',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Success',
              text: 'The User has Been Deleted',
              icon: 'success',
            });
            User_Table_Start.row(Selected_Row).remove().draw();
          }
        });
      });
    });
  }

  public Open_Modal_Form(data: any): void {
    if (data == null) {
      $('#roleId').removeClass('is-valid');
      $('#roleId').removeClass('is-invalid');
      $('#userDni').removeClass('is-valid');
      $('#userDni').removeClass('is-invalid');
      $('#userEmail').removeClass('is-valid');
      $('#userEmail').removeClass('is-invalid');
      $('#userName').removeClass('is-valid');
      $('#userName').removeClass('is-invalid');
      $('#userLastName').removeClass('is-valid');
      $('#userLastName').removeClass('is-invalid');
      $('#userPhone').removeClass('is-valid');
      $('#userPhone').removeClass('is-invalid');
      $('#userAddress').removeClass('is-valid');
      $('#userAddress').removeClass('is-invalid');
      $('#userBirth').removeClass('is-valid');
      $('#userBirth').removeClass('is-invalid');
      userId = 0;
      $('#roleId').val(0);
      $('#userDni').val('');
      $('#userEmail').val('');
      $('#userName').val('');
      $('#userLastName').val('');
      $('#userPhone').val('');
      $('#userAddress').val('');
      $('#userBirth')
        .datepicker({ dateFormat: 'dd/mm/yy', maxDate: '+0D' })
        .datepicker('setDate', '');
    } else {
      if (data != null) {
        $('#roleId').removeClass('is-valid');
        $('#roleId').removeClass('is-invalid');
        $('#userDni').removeClass('is-valid');
        $('#userDni').removeClass('is-invalid');
        $('#userEmail').removeClass('is-valid');
        $('#userEmail').removeClass('is-invalid');
        $('#userName').removeClass('is-valid');
        $('#userName').removeClass('is-invalid');
        $('#userLastName').removeClass('is-valid');
        $('#userLastName').removeClass('is-invalid');
        $('#userPhone').removeClass('is-valid');
        $('#userPhone').removeClass('is-invalid');
        $('#userAddress').removeClass('is-valid');
        $('#userAddress').removeClass('is-invalid');
        $('#userBirth').removeClass('is-valid');
        $('#userBirth').removeClass('is-invalid');
        userId = data.userId;
        $('#roleId').val(data.roleEntities[0].roleId);
        $('#userDni').val(data.userDni);
        $('#userEmail').val(data.userEmail);
        $('#userName').val(data.userName);
        $('#userLastName').val(data.userLastName);
        $('#userPhone').val(data.userPhone);
        $('#userAddress').val(data.userAddress);
        $('#userBirth')
          .datepicker({ dateFormat: 'dd/mm/yy', maxDate: '+0D' })
          .datepicker('setDate', data.userBirth);
      }
    }
    $('#Form_01').modal('show');
  }

  private jQuery_Validator(): void {
    $.validator.addMethod('Valid_userDni', function (value: any, element: any) {
      return this.optional(element) || /^[0-9]+$/.test(value);
    });

    $.validator.addMethod(
      'Valid_userEmail',
      function (value: any, element: any) {
        return (
          this.optional(element) ||
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
        );
      }
    );

    /* $.validator.addMethod("Valid_userPassword", function (value: any, element: any) {
      return (
        this.optional(element) ||
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
          value
        )
      );
    }); */

    $.validator.addMethod(
      'Valid_userName',
      function (value: any, element: any) {
        return (
          this.optional(element) ||
          /^[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC]+$/.test(
            value
          )
        );
      }
    );

    $.validator.addMethod(
      'Valid_userLastName',
      function (value: any, element: any) {
        return (
          this.optional(element) ||
          /^[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC]+$/.test(
            value
          )
        );
      }
    );

    $.validator.addMethod(
      'Valid_userPhone',
      function (value: any, element: any) {
        return this.optional(element) || /^[0-9]+$/.test(value);
      }
    );

    $.validator.addMethod(
      'Valid_userAddress',
      function (value: any, element: any) {
        return (
          this.optional(element) ||
          /([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/.test(value)
        );
      }
    );

    $.validator.addMethod(
      'Valid_userBirth',
      function (value: any, element: any) {
        return (
          this.optional(element) ||
          /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
            value
          )
        );
      }
    );

    $('#User_Form').validate({
      rules: {
        roleId: {
          required: true,
        },
        userDni: {
          required: true,
          number: true,
          Valid_userDni: true,
          digits: true,
          minlength: 8,
          maxlength: 8,
        },
        userEmail: {
          required: true,
          Valid_userEmail: true,
          maxlength: 50,
        },
        /* userPassword: {
          required: true,
          Valid_userPassword: true,
          maxlength: 50,
        }, */
        userName: {
          required: true,
          Valid_userName: true,
          maxlength: 50,
        },
        userLastName: {
          required: true,
          Valid_userLastName: true,
          maxlength: 50,
        },
        userPhone: {
          required: true,
          number: true,
          Valid_userPhone: true,
          digits: true,
          minlength: 9,
          maxlength: 9,
        },
        userAddress: {
          required: true,
          Valid_userAddress: true,
          maxlength: 50,
        },
        userBirth: {
          required: true,
          Valid_userBirth: true,
          maxlength: 10,
        },
      },
      messages: {
        roleId: {
          required: 'Required: roleId',
        },
        userDni: {
          required: 'Required: userDni',
          number: 'Number: userDni',
          Valid_userDni: 'Valid: Valid_userDni',
          digits: 'Digits: userDni',
          minlength: 'Min Length: userDni',
          maxlength: 'Max Length: userDni',
        },
        userEmail: {
          required: 'Required: userEmail',
          Valid_userEmail: 'Valid: userEmail',
          maxlength: 'Max Length: userEmail',
        },
        /* userPassword: {
          required: "Required: userPassword",
          Valid_userPassword: "Valid: userPassword",
          maxlength: "Max Length: userPassword",
        }, */
        userName: {
          required: 'Required: userName',
          Valid_userName: 'Valid: userName',
          maxlength: 'Max Length: userName',
        },
        userLastName: {
          required: 'Required: userLastName',
          Valid_userLastName: 'Valid: userLastName',
          maxlength: 'Max Length: userLastName',
        },
        userPhone: {
          required: 'Required: userPhone',
          number: 'Number: userPhone',
          Valid_userPhone: 'Valid: userPhone',
          digits: 'Digits: userPhone',
          minlength: 'Min Length: userPhone',
          maxlength: 'Max Length: userPhone',
        },
        userAddress: {
          required: 'Required: userAddress',
          Valid_userAddress: 'Valid: userAddress',
          maxlength: 'Max Length: userAddress',
        },
        userBirth: {
          required: 'Required: userBirth',
          Valid_userBirth: 'Valid: userBirth',
          maxlength: 'Max Length: userBirth',
        },
      },
      errorElement: 'em',
      errorPlacement: function (error: any, element: any) {
        // Add the "invalid-feedback" class to the error element
        error.addClass('invalid-feedback');

        if (element.prop('type') === 'checkbox') {
          error.insertAfter(element.next('label'));
        } else {
          error.insertAfter(element);
        }
      },
      highlight: function (
        element: any,
        errorClass: any,
        validClass: any
      ): void {
        $(element).addClass('is-invalid').removeClass('is-valid');
      },
      unhighlight: function (
        element: any,
        errorClass: any,
        validClass: any
      ): void {
        $(element).addClass('is-valid').removeClass('is-invalid');
      },
    });

    $.validator.setDefaults({
      submitHandler: function () {
        console.log('Success!'); // ? Good 'console.log'
      },
    });
  }

  private generateUserPassword(length: number): string {
    let userPassword = '';
    var charactersLength = this.characters.length;
    for (let i = 0; i < length; i++) {
      userPassword += this.characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    return userPassword;
  }

  private saveUser(): void {
    // debugger; // TODO: Debugger Breakpoint
    this.userService.createUser(this.user).subscribe(
      (data) => {
        // debugger; // TODO: Debugger Breakpoint
        console.log(data); // ? Good 'console.log'
        var user = Object.assign(new User(), data);
        console.log(user); // ? Good 'console.log'
        if (user.userId != 0) {
          var User_Table_Start = $('#User_Table_Start').DataTable();
          $('#Form_01').modal('hide');
          User_Table_Start.row
            .add({
              userId: user.userId,
              roleEntities: [
                {
                  roleId: user.roleEntities[0].roleId,
                  enumRole: user.roleEntities[0].enumRole,
                  roleRegister: user.roleEntities[0].roleRegister,
                },
              ],
              userDni: user.userDni,
              userEmail: user.userEmail,
              userName: user.userName,
              userLastName: user.userLastName,
              userPhone: user.userPhone,
              userAddress: user.userAddress,
              userBirth: user.userBirth,
              userState: user.userState,
              userRegister: user.userRegister,
            })
            .draw();
          this._toastr.success(
            'The User has Been Inserted Successfully.',
            'Success:',
            {
              tapToDismiss: true,
              closeButton: true,
              newestOnTop: true,
              progressBar: true,
              progressAnimation: 'decreasing',
              timeOut: 5000,
              extendedTimeOut: 1000,
              disableTimeOut: false,
              positionClass: 'toast-top-right',
            }
          );
        } else {
          this._toastr.error(data.toString(), 'Error:', {
            tapToDismiss: true,
            closeButton: true,
            newestOnTop: true,
            progressBar: true,
            progressAnimation: 'decreasing',
            timeOut: 5000,
            extendedTimeOut: 1000,
            disableTimeOut: false,
            positionClass: 'toast-top-right',
          });
        }
      },
      (error) => console.log(error) // ? Good 'console.log'
    );
  }

  public onSubmit(): void {
    // debugger; // TODO: Debugger Breakpoint
    if (!$('#User_Form').valid()) {
      return;
    } else {
      console.log(this.user); // ? Good 'console.log'

      var roleId = $('#roleId').val();
      var Alternative_Role_Array: Role[] = [];
      for (let i = 0; i < this.roles.length; i++) {
        if (roleId == this.roles[i].roleId) {
          Alternative_Role_Array.push(this.roles[i]);
        }
      }

      this.user.roleEntities = Alternative_Role_Array;
      this.user.userDni = $('#userDni').val();
      this.user.userEmail = $('#userEmail').val();
      this.user.userPassword = this.generateUserPassword(10);
      this.user.userName = $('#userName').val();
      this.user.userLastName = $('#userLastName').val();
      this.user.userPhone = $('#userPhone').val();
      this.user.userAddress = $('#userAddress').val();
      this.user.userBirth = $('#userBirth').val();

      console.log(this.user); // ? Good 'console.log'
      if (userId == 0) {
        $('.modal-body').LoadingOverlay('hide');
        this.saveUser();
      } else {
        if (userId != 0) {
          alert("You're Editing"); // ! Alert
        }
      }
    }
  }
}