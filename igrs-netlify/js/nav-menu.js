document.addEventListener('DOMContentLoaded', function () {
  var menuToggle = document.getElementById('menuToggle');
  var navMobile = document.getElementById('navMobile');

  if (menuToggle && navMobile) {
    menuToggle.addEventListener('click', function () {
      navMobile.classList.toggle('active');
    });
  }

  var labels = document.querySelectorAll('.mobile-nav-label');
  labels.forEach(function (label) {
    label.addEventListener('click', function () {
      var submenu = label.nextElementSibling;
      if (submenu && submenu.classList.contains('mobile-submenu')) {
        submenu.classList.toggle('open');
      }
    });
  });
});

