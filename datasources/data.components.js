app.factory('dataComponents',  function(dataUsers){
	var data = {};

	data.components = [
		{
			name: "Query SOMETHING",
			creator: dataUsers.users['aperson'],
			usage: [1,4,8,4,3]
		},
		{
			name: "Query ANOTHER",
			creator: dataUsers.users['aperson'],
			usage: [7,4,2,4,3]

		},
		{
			name: "Query THAT",
			creator: dataUsers.users['aperson'],
			usage: [3,4,8,9,9]
		},
		{
			name: "Query THIS",
			creator: dataUsers.users['aperson'],
			usage: [5,6,3,2,1]
		}
	];

	return data;
});