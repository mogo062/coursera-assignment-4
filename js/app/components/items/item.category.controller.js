(function(){
  'use strict';

  angular.module('MenuApp')
    .controller('MenuCategoryItemsController',MenuCategoryItemsController);

  MenuCategoryItemsController.$inject=['items'];
  function MenuCategoryItemsController(items) {
    var menuCategoryItems = this;
    console.log('menuCategoryItems.items : ',items);
    menuCategoryItems.items = items;

    menuCategoryItems.tbheader=[
      {
        name : 'Id',
        class : 'fixedWdith-35'
      },{
        name : 'description',
        class : 'fixedWdith-35'
      },{
        name : 'short name'
      }
    ];
  };
})();
