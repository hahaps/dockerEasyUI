angular.module('container').directive('containerConsole', function containerConsole(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            consoleData : '='
        },
        template: '<div></div>',
        controller: ['$scope', '$element', function containerConsoleController($scope, $element) {
          var consoleData    = null;
          $scope.$watch('consoleData', function initialConsole(consoleData) {
            if(!consoleData) return;
            var terminalContainer = $element[0],
                term = new Terminal(),
                prompt = '> ',
                url = 'ws://' + consoleData.host
                      + ':' + consoleData.port
                      + '/containers/' + consoleData.id
                      + '/attach/ws?logs=' + consoleData.logs
                      + '&stream=' + consoleData.stream
                      + '&stdin=' + consoleData.stdin
                      + '&stdout=' + consoleData.stdout
                      + '&stderr=' + consoleData.stderr,
                socket = new WebSocket(url);
            term.open(terminalContainer);
            term.fit();

            term.prompt = function () {
              term.write('\r\n' + prompt);
            };

            term.writeln('Welcome to Docker Easy UI');
            term.writeln('');
            term.prompt();

            term.on('data', function(data) {
              socket.send(data);
            });
            socket.onmessage = function (e) {
              term.write(e.data);
            };
          });
        }]
    };
});
