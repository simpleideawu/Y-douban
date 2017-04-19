;(function () {
  $('.del').on('click', function (event) {
    var target = $(event.target);
    var id = target.data('id');
    var tr = $('#user-id-' + id);
    $.ajax({
      type: 'DELETE',
      url: '/admin/userlist?id=' + id
    }).done( function (results) {
      if (results.success === 1) {
        if (tr.length > 0) {
          tr.remove();
        }
      }
    });
  });
})();
