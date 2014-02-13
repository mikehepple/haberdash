_modules.register({
	name: "Users",
	baseRoute: "/users",
	routes: [
		{ path : '/users', templateUrl: 'widgets/users/users-list.html', controller: UserListCtrl },
		{ path : '/users/:user', templateUrl: 'widgets/users/user.html', controller: UserCtrl }
	]
});

function UserListCtrl($scope,dataUsers) {
}

function UserCtrl($scope,$routeParams,dataUsers,mixUserComponents) {
	$scope.user = dataUsers.users[$routeParams.user];
}