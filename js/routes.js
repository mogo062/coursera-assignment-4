(function(){
  'use strict';
  angular.module('MenuApp').config(RoutesConfig);

  RoutesConfig.$inject=['$stateProvider','$urlRouterProvider']
  function RoutesConfig($stateProvider , $urlRouterProvider){
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider
      // Home page
    .state('home', {
      url : '/',
      templateUrl : 'js/app/templates/home.template.html'
    })
    .state('categories',{
      url : '/categories',
    //  template : '<categories items="menuCategories.items"></categories><ui-view></ui-view>',
      templateUrl : 'js/app/templates/categories/categoriesList.template.html',
      controller : 'MenuCategoriesController',
      controllerAs : 'menuCategories',
      resolve : {
        items : ['MenuDataService', function(MenuDataService){
          return MenuDataService.getAllCategories().then(function(reponse) {
              return reponse.data;
          });
        }]
      }
    })
    .state('categories.items',{
        url : '/categories/{categId}',
        templateUrl : 'js/app/templates/items/itemsList.template.html',
        controller : 'MenuCategoryItemsController',
        controllerAs : 'menuCategoryItems',
        resolve : {
          items :  ['$stateParams','MenuDataService', function($stateParams, MenuDataService){
              return MenuDataService.getItemsForCategory($stateParams.categId).then(function(response){
                return  response.data.menu_items;
              });
          }]
        }


    });

  };
})();
