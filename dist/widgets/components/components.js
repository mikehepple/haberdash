_modules.register({
	name: "Components",
	baseRoute: "/components",
	routes: [
		{ path : '/components', templateUrl: 'widgets/components/component-list.html', controller: ComponentListCtrl },
		{ path : '/components/:name', templateUrl: 'widgets/components/component.html', controller: ComponentCtrl }
	]
});

function ComponentListCtrl($scope, dataComponents) {
	$scope.components = dataComponents.components;
}

function ComponentCtrl($scope, $routeParams, dataComponents) {
	angular.forEach(dataComponents.components, function(component) {
		if (component.name == $routeParams.name) {
			$scope.component = component;
		}
	});
}



app.directive('componentLine', function () {
    return {
        restrict: 'A',
        scope: { 
        	usageData: '=',
        	width: '='
        },
        link: function (scope, elem) {
            scope.$watch('usageData', function (newData) {
                elem.sparkline(newData, { width: scope.width });
            });
        }
    };
});