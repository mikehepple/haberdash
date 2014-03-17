app.factory('dataUsers',  function(){
	var data = {};

	data.users = {
		'aperson' : {
			name : 'A. Person',
			username : 'aperson',
			components : []
		}
	}
	return data;
});

app.factory('mixUserComponents', function(dataUsers, dataComponents) {
	// Add components to the user
	angular.forEach(dataComponents.components, function(component) {
		component.creator.components.push(component);
	});
});
