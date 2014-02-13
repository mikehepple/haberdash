_modules.push({
	name: "Components",
	route: "/components"
});

app.config(function($routeProvider) {
	$routeProvider.when('/components', {
		templateUrl: 'mods/components.html',
		controller: ComponentsCtrl
	});
});

function ComponentsCtrl($scope) {
	
}