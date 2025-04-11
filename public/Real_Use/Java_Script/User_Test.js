$(function () {
  Function_User_Table_01();
  Function_User_Table_02();
  // Function_ComboBox(); // * Alternative
  $("#User_Table tbody").on("click", ".Edit_Button", function () {
    // var Selected_Row = $(this).closest("tr") // ! Not Responsive
    var Selected_Row = Selected_Row_Function(this);
    var data = User_Table.row(Selected_Row).data();
    console.log(data); // ? Good 'console.log'
    Open_Modal_Form(data);
  });
  $("#User_Table tbody").on("click", ".Delete_Button", function () {
    var Selected_Row = Selected_Row_Function(this);
    var data = User_Table.row(Selected_Row).data();
    console.log(data); // ? Good 'console.log'
    Swal.fire({
      title: "Confirmation",
      text: "Do you Want to Delete the Selected User?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "#FF0000",
      confirmButtonText: "Delete",
      confirmButtonColor: "#3085D6",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Success",
          text: "The User has Been Deleted",
          icon: "success",
        });
        User_Table.row(Selected_Row).remove().draw();
      }
    });
  });
});

var User_Table = null;
var userId = 0;
var Url_01 = "http://localhost:8080/api/rest/user/all";
var Url_02 = "http://localhost:8080/api/rest/user/allRoleEntities";

function Function_User_Table_01() {
  jQuery.ajax({
    url: Url_01,
    type: "GET",
    dataType: "json",
    dataSrc: "",
    success: function (data) {
      // debugger; // TODO: Debugger Breakpoint
      console.log(data); // ? Good 'console.log'
    },
  });
}

function Function_User_Table_02() {
  User_Table = $("#User_Table").DataTable({
    responsive: true,
    ordering: false,
    ajax: {
      url: Url_01,
      type: "GET",
      dataType: "json",
      dataSrc: "",
    },
    columns: [
      { data: "userId" },
      {
        data: "roleEntities",
        render: function (roleEntities) {
          var Result = "";
          for (let i = 0; i < roleEntities.length; i++) {
            Result += roleEntities[i].enumRole + ", ";
          }
          return (
            '<span class="badge text-bg-primary">' +
            Result.slice(0, -2) +
            "</span>"
          );
        },
      },
      { data: "userDni" },
      { data: "userEmail" },
      { data: "userPassword" },
      { data: "userName" },
      { data: "userLastName" },
      { data: "userPhone" },
      { data: "userAddress" },
      { data: "userBirth" },
      {
        data: "userState",
        render: function (userState) {
          if (userState) {
            return '<span class="badge text-bg-success">Active</span>';
          } else {
            return '<span class="badge text-bg-danger">Disabled</span>';
          }
        },
      },
      { data: "userRegister" },
      {
        defaultContent:
          '<div class="d-flex flex-row justify-content-start gap-2"><button type="button" class="btn btn-primary Edit_Button"><i class="fa-solid fa-pencil"></i></button><button type="button" class="btn btn-danger Delete_Button"><i class="fa-solid fa-trash"></i></button></div>',
        orderable: false,
        searchable: false,
        width: "90px",
      },
    ],
  });
}

function Selected_Row_Function(data) {
  // ? Get Current Row
  var Selected_Row = $(data).parents("tr");
  // ? Verify if the Current Row is a Secondary Row
  if (Selected_Row.hasClass("child")) {
    // ? If it's Like That, Point the Previous Row (It's "parent")
    Selected_Row = Selected_Row.prev();
  }
  return Selected_Row;
}

function Open_Modal_Form(data) {
  if (data == null) {
    $("#roleId").removeClass("is-valid");
    $("#roleId").removeClass("is-invalid");
    $("#userDni").removeClass("is-valid");
    $("#userDni").removeClass("is-invalid");
    $("#userEmail").removeClass("is-valid");
    $("#userEmail").removeClass("is-invalid");
    $("#userPassword").removeClass("is-valid");
    $("#userPassword").removeClass("is-invalid");
    $("#userName").removeClass("is-valid");
    $("#userName").removeClass("is-invalid");
    $("#userLastName").removeClass("is-valid");
    $("#userLastName").removeClass("is-invalid");
    $("#userPhone").removeClass("is-valid");
    $("#userPhone").removeClass("is-invalid");
    $("#userAddress").removeClass("is-valid");
    $("#userAddress").removeClass("is-invalid");
    $("#userBirth").removeClass("is-valid");
    $("#userBirth").removeClass("is-invalid");
    userId = 0;
    $("#roleId").val(0);
    $("#userDni").val("");
    $("#userEmail").val("");
    $("#userPassword").val("");
    $("#userName").val("");
    $("#userLastName").val("");
    $("#userPhone").val("");
    $("#userAddress").val("");
    $("#userBirth")
      .datepicker({ dateFormat: "dd/mm/yy", maxDate: "+0D" })
      .datepicker("setDate", "");
  } else {
    if (data != null) {
      $("#roleId").removeClass("is-valid");
      $("#roleId").removeClass("is-invalid");
      $("#userDni").removeClass("is-valid");
      $("#userDni").removeClass("is-invalid");
      $("#userEmail").removeClass("is-valid");
      $("#userEmail").removeClass("is-invalid");
      $("#userPassword").removeClass("is-valid");
      $("#userPassword").removeClass("is-invalid");
      $("#userName").removeClass("is-valid");
      $("#userName").removeClass("is-invalid");
      $("#userLastName").removeClass("is-valid");
      $("#userLastName").removeClass("is-invalid");
      $("#userPhone").removeClass("is-valid");
      $("#userPhone").removeClass("is-invalid");
      $("#userAddress").removeClass("is-valid");
      $("#userAddress").removeClass("is-invalid");
      $("#userBirth").removeClass("is-valid");
      $("#userBirth").removeClass("is-invalid");
      userId = data.userId;
      $("#roleId").val(data.roleEntities[0].roleId);
      $("#userDni").val(data.userDni);
      $("#userEmail").val(data.userEmail);
      $("#userPassword").val(data.userPassword);
      $("#userName").val(data.userName);
      $("#userLastName").val(data.userLastName);
      $("#userPhone").val(data.userPhone);
      $("#userAddress").val(data.userAddress);
      $("#userBirth")
        .datepicker({ dateFormat: "dd/mm/yy", maxDate: "+0D" })
        .datepicker("setDate", data.userBirth);
    }
  }
  $("#Form_01").modal("show");
}

function Function_ComboBox() {
  jQuery.ajax({
    url: Url_02,
    type: "GET",
    dataType: "json",
    dataSrc: "",
    success: function (data) {
      // debugger; // TODO: Debugger Breakpoint
      console.log(data); // ? Good 'console.log'
      $("<option>")
        .attr({ value: "0", disabled: "true", selected: "true" })
        .text("Select")
        .appendTo("#roleId");
      $.each(data, function (index, item) {
        $("<option>")
          .attr({ value: item.roleId })
          .text(item.enumRole)
          .appendTo("#roleId");
      });
    },
  });
}

jQuery.validator.addMethod("Valid_userDni", function (value, element) {
  return this.optional(element) || /^[0-9]+$/.test(value);
});

jQuery.validator.addMethod("Valid_userEmail", function (value, element) {
  return (
    this.optional(element) || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
  );
});

jQuery.validator.addMethod("Valid_userPassword", function (value, element) {
  return (
    this.optional(element) ||
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
      value
    )
  );
});

jQuery.validator.addMethod("Valid_userName", function (value, element) {
  return (
    this.optional(element) ||
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC]+$/.test(
      value
    )
  );
});

jQuery.validator.addMethod("Valid_userLastName", function (value, element) {
  return (
    this.optional(element) ||
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC]+$/.test(
      value
    )
  );
});

jQuery.validator.addMethod("Valid_userPhone", function (value, element) {
  return this.optional(element) || /^[0-9]+$/.test(value);
});

jQuery.validator.addMethod("Valid_userAddress", function (value, element) {
  return (
    this.optional(element) ||
    /([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/.test(value)
  );
});

jQuery.validator.addMethod("Valid_userBirth", function (value, element) {
  return (
    this.optional(element) ||
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
      value
    )
  );
});

$(function () {
  $("#Form_User").validate({
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
      userPassword: {
        required: true,
        Valid_userPassword: true,
        maxlength: 50,
      },
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
        required: "Required: roleId",
      },
      userDni: {
        required: "Required: userDni",
        number: "Number: userDni",
        Valid_userDni: "Valid: Valid_userDni",
        digits: "Digits: userDni",
        minlength: "Min Length: userDni",
        maxlength: "Max Length: userDni",
      },
      userEmail: {
        required: "Required: userEmail",
        Valid_userEmail: "Valid: userEmail",
        maxlength: "Max Length: userEmail",
      },
      userPassword: {
        required: "Required: userPassword",
        Valid_userPassword: "Valid: userPassword",
        maxlength: "Max Length: userPassword",
      },
      userName: {
        required: "Required: userName",
        Valid_userName: "Valid: userName",
        maxlength: "Max Length: userName",
      },
      userLastName: {
        required: "Required: userLastName",
        Valid_userLastName: "Valid: userLastName",
        maxlength: "Max Length: userLastName",
      },
      userPhone: {
        required: "Required: userPhone",
        number: "Number: userPhone",
        Valid_userPhone: "Valid: userPhone",
        digits: "Digits: userPhone",
        minlength: "Min Length: userPhone",
        maxlength: "Max Length: userPhone",
      },
      userAddress: {
        required: "Required: userAddress",
        Valid_userAddress: "Valid: userAddress",
        maxlength: "Max Length: userAddress",
      },
      userBirth: {
        required: "Required: userBirth",
        Valid_userBirth: "Valid: userBirth",
        maxlength: "Max Length: userBirth",
      },
    },
    errorElement: "em",
    errorPlacement: function (error, element) {
      // Add the "invalid-feedback" class to the error element
      error.addClass("invalid-feedback");

      if (element.prop("type") === "checkbox") {
        error.insertAfter(element.next("label"));
      } else {
        error.insertAfter(element);
      }
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass("is-invalid").removeClass("is-valid");
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).addClass("is-valid").removeClass("is-invalid");
    },
  });
});

$.validator.setDefaults({
  submitHandler: function () {
    console.log("Success!"); // ? Good 'console.log'
  },
});