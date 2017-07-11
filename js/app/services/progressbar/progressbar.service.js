(function(){
  'use strict';
  angular.module('progressbar')
    .config(httpProviderConfig)
    .service('progressInterceptor', progressInterceptor)
    .service('progress', progressService);

    httpProviderConfig.$inject=['$httpProvider'];
    function httpProviderConfig($httpProvider){
        return $httpProvider.interceptors.push('progressInterceptor');
    };

    progressInterceptor.$inject=['$log','$rootScope','$timeout','progress'];
    function progressInterceptor($log, $rootScope, $timeout, progress) {
      var promise = null;
      var service = this;

      service.request = function(conf){
        // start the progress lately -
        // this mean showing the bar only for
        // requests that are longest than (default 100ms)
        promise = $timeout(function() {
          $rootScope.$broadcast('progress:start');
        }, progress.latency);

      };
      service.requestError = function(){
          $timeout.cancel(promise);
          return $rootScope.$broadcast('progress:stop', { status: 'error' } );
      };
      service.response = function(response){
          $timeout.cancel(promise);
          $rootScope.$broadcast('progress:complete');
          return response;
      };
      service.responseError = function(reject){
          $timeout.cancel(promise);
          return $rootScope.$broadcast('progress:stop', { status: 'error' } );
      };
      return service;
    };
    progressService.$inejct=['$rootScope']
    function progressService($rootScope) {
      var service = this;
      service.latency = 100;
      service.start = function(){
        console.log("2");
        return $rootScope.$broadcast('progress:start');
      };
      service.stop = function(status){
        return $rootScope.$broadcast('progress:stop', { status: status });
      };
      service.reset = function(){
        return $rootScope.$broadcast('progress:reset');
      };
      service.complete = function(){
        return $rootScope.$broadcast('progress:complete');
      };
      return service;
    };

})();
