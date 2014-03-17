_modules.register({
	name: "Graph",
	baseRoute: "/graph",
	routes: [
		{ path : '/graph', templateUrl: 'widgets/graph/graph.html', controller: GraphCtrl }
	]
});

function GraphCtrl($scope, dataComponents) {

	$scope.nodes = [
		{ label: "node 1" },
		{ label: "node 2" },
		{ label: "node 3" },
		{ label: "node 4" },
		{ label: "node 5" }
	];
	$scope.edges = [
		{
			source: $scope.nodes[0],
			target: $scope.nodes[1]
		},

		{
			source: $scope.nodes[3],
			target: $scope.nodes[4]
		},

		{
			source: $scope.nodes[0],
			target: $scope.nodes[2]
		}
	];

}

angular.module('haberdashApp').directive('graph', [function () {
	return {
		restrict: 'A',
		scope: {
			nodes : '=',
			edges: '=',
			width: '@',
			height: '@'
		},
		templateUrl: 'widgets/graph/graph-inc.html',
		link: function (scope, elem, iAttrs) {

			// var force = d3.layout.force()
			// 	.size([500, 500])
			// 	.nodes(scope.nodes)
			// 	.links(scope.edges);
			// force.start();
			// var svg = d3.select(elem[0]).append("svg")
			//     .attr("width", scope.width)
			//     .attr("height", scope.height);
			// // add the links and the arrows
			// var path = svg.append("svg:g").selectAll("path")
			//     .data(force.links())
			//   .enter().append("svg:path")
			// //    .attr("class", function(d) { return "link " + d.type; })
			//     .attr("class", "link");

			// // define the nodes
			// var node = svg.selectAll(".node")
			//     .data(force.nodes())
			//   	.enter().append("g")
			//     .attr("class", "node")
			//     .call(force.drag);

			var force = d3.layout.force()
			    .nodes(scope.nodes)
			    .links(scope.edges)
			    .size([scope.width, scope.height])
			    .linkDistance(60)
			    .charge(-300)
			    .on("tick", tick)
			    .start();

			var svg = d3.select(elem[0]).append("svg")
			    .attr("width", scope.width)
			    .attr("height", scope.height);

			// // build the arrow.
			// svg.append("svg:defs").selectAll("marker")
			//     .data(["end"])      // Different link/path types can be defined here
			//   .enter().append("svg:marker")    // This section adds in the arrows
			//     .attr("id", String)
			//     .attr("viewBox", "0 -5 10 10")
			//     .attr("refX", 15)
			//     .attr("refY", -1.5)
			//     .attr("markerWidth", 6)
			//     .attr("markerHeight", 6)
			//     .attr("orient", "auto")
			//   .append("svg:path")
			//     .attr("d", "M0,-5L10,0L0,5");

			// add the links and the arrows
			var path = svg.append("svg:g").selectAll("path")
			    .data(force.links())
			  .enter().append("svg:path")
			//    .attr("class", function(d) { return "link " + d.type; })
			    .attr("class", "link")
			    .attr("marker-end", "url(#end)");

			// define the nodes
			var node = svg.selectAll(".node")
			    .data(force.nodes())
			  .enter().append("g")
			    .attr("class", "node")
			    .call(force.drag);

			// add the nodes
			node.append("circle")
			    .attr("r", 5);

			// add the text 
			node.append("text")
			    .attr("x", 12)
			    .attr("dy", ".35em")
			    .text(function(d) { return d.label; });

			// add the curvy lines
			function tick() {
			    path.attr("d", function(d) {
			        var dx = d.target.x - d.source.x,
			            dy = d.target.y - d.source.y,
			            dr = Math.sqrt(dx * dx + dy * dy);
			        return "M" + 
			            d.source.x + "," + 
			            d.source.y + "A" + 
			            dr + "," + dr + " 0 0,1 " + 
			            d.target.x + "," + 
			            d.target.y;
			    });

			    node
			        .attr("transform", function(d) { 
			  	    return "translate(" + d.x + "," + d.y + ")"; });
			}

		}
	};
}])
