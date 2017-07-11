(function(){
  'use strict';
  angular.module('MenuApp').component('categories',{
    templateUrl: 'js/app/templates/categories/categories.component.template.html',
    bindings: {
       items: '<'
    }
  });

})();
