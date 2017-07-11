(function(){
  'use strict';

   angular.module('progressbar',[])
    .directive('progressBar',progressBarDirective);

    progressBarDirective.$inject=['$interval'];
    function progressBarDirective($interval) {
      var ddo = {
        restrict: 'E',
        replace: true,
        template: '<div id="angular-progress" class="progress-container"><div class="bar"></div></div>',
        link: progressBarLink
      };
      return ddo;

      function progressBarLink(scope, elem, attrs, controller) {
        var progress = 0, status = 0, interval;
        function _setProgress(n) {
            elem[0].childNodes[0].style.width = ( n * 100 ) + '%';
            return status = n;
        }

        function _increment() {

            var rnd = 0;

            if (status >= 0 && status < 0.25) {
                // Start out between 3 - 6% increments
                rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
            } else if (status >= 0.25 && status < 0.65) {
                // increment between 0 - 3%
                rnd = (Math.random() * 3) / 100;
            } else if (status >= 0.65 && status < 0.9) {
                // increment between 0 - 2%
                rnd = (Math.random() * 2) / 100;
            } else if (status >= 0.9 && status < 0.99) {
                // finally, increment it .5 %
                rnd = 0.005;
            } else {
                // after 99%, don't increment:
                rnd = 0.0001;
            }

            _setProgress(status + rnd);
        }

        scope.$on('progress:start',function(){
          console.log("3");
          // remove previous interval (if exists)
          $interval.cancel(interval);
          // clear progress bar status
          // if not already to start position
          _setProgress(0);

          attrs.$updateClass( 'progress-container start', elem.attr('class') );
          // increment interval
          interval = $interval(function() {
              if( status >= 1 ) { $interval.cancel(interval); }
              return _increment();
          }, 150 )
        });
        scope.$on('progress:stop',function(event, data){
          var status = data.status ? data.status : 'stop';
          attrs.$updateClass( 'progress-container ' + status, elem.attr('class') );
          return $interval.cancel(interval);
        });
        scope.$on('progress:reset',function(){
          // reset default class
          attrs.$updateClass( 'progress-container', elem.attr('class') );
          return _setProgress(0);
        });
        scope.$on('progress:complete',function(){
          attrs.$updateClass( 'progress-container complete', elem.attr('class') );
          return _setProgress(1);
        });
      };

    };

})();
