$(document).ready(function () {
  Function_User_Table();
  Function_User_Table_Alternative();
});

var User_Table;
var Url_01 = "http://localhost:8080/api/rest/user/all";
var Result = "";

function Function_User_Table() {
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
          Result = "";
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
          '<div class="d-flex flex-row justify-content-start gap-2"><button type="button" class="btn btn-primary"><i class="fa-solid fa-pencil"></i></button><button type="button" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></div>',
        orderable: false,
        searchable: false,
        width: "90px",
      },
    ],
  });
}

function Function_User_Table_Alternative() {
  jQuery.ajax({
    url: Url_01,
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
    },
  });
}