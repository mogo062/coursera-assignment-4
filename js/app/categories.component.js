(function(){
  'use strict';
  angular.module('MenuApp').component('categories',{
    templateUrl: 'js/app/templates/categories.component.template.html',
    bindings: {
       items: '<'
    }
  });

})();
