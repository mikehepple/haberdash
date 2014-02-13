var app = angular.module('haberdashApp', ['ngRoute']);

var _modules = {
	modules : [],
	register : function(moduleDef) {
		_modules.modules.push(moduleDef);
		angular.forEach(moduleDef.routes, function(route) {
			app.config(function($routeProvider) {
				$routeProvider.when(route.path, route);
			});
		});
	},
	current : function(template) {
		var result = "";
		angular.forEach(_modules.modules, function(module) {
			angular.forEach(module.routes, function(route) {
				if (route.templateUrl == template) {
					result = module.name;
				}
			});
		});
		return result;
	}
};

app.controller('ModuleController', function($scope, $route, $location){
	$scope.$on('$routeChangeSuccess', function(scope, current, pre) {
		if (!current || !current.loadedTemplateUrl) {
			$scope.currentModule = null;
		}
		$scope.currentModule = _modules.current(current.loadedTemplateUrl);
	});
	$scope.$route = $route;
	$scope.$location = $location;
	$scope.modules = _modules.modules;
});

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', { templateUrl : 'partials/home.html'})
	.otherwise({
		templateUrl: 'partials/404.html'
	});
});



