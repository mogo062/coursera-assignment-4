(function(){
  'use strict';
  angular.module('MenuApp').component('menuItems',{
    templateUrl: 'js/app/templates/items.component.template.html',
    bindings: {
       items: '<',
       tbheader : '<'
    }
  });
})();
