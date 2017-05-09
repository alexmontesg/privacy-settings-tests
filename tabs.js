var tabs = [{
    title : 'Interface 1',
}, {
    title : 'Interface 2',
}, {
    title : 'Interface 3',
}, {
    title : 'Survey'
}];

var app = angular.module("usability_test", []);
app.controller("TabController", ['$scope',
function($scope) {
    $scope.tabs = tabs;
    $scope.tab = 0;
    $scope.setTab = function(tab) {
        $scope.tab = tab;
    };
    $scope.isSet = function(tab) {
        return $scope.tab === tab;
    };
}]);

app.directive('script', function() {
    return {
        restrict : 'E',
        scope : false,
        link : function(scope, elem, attr) {
            if (attr.type === 'text/javascript-lazy') {
                var code = elem.text();
                var f = new Function(code);
                f();
            }
        }
    };
});

