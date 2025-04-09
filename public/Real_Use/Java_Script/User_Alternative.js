$(document).ready(function () {
  Function_User_Table();
});

var User_Table;

function Function_User_Table() {
  User_Table = $("#User_Table").DataTable({
    responsive: true,
    ordering: false,
    language: {
      url: "//cdn.datatables.net/plug-ins/2.1.8/i18n/es-MX.json",
    },
  });
}