hypocriteApp.directive('states', function ( /* dependencies */ ) {
  // define constants and helpers used for the directive
  // ...
  return {
    restrict: 'A', // the directive can be invoked only by using <div my-directive></div> tag in the template
    scope: {
        stateBoundaries: '=',  // Object containing coordinates
        data: '=',
        tooltipFunction: '='   // Get rid of this later.
    },
    templateUrl: "templates/states.html",
    link: function ($scope, element, attrs) {
        var states = {};
		
		$scope.draw = function(id, data, toolTip){		
			function mouseOver(p){
				d3.select("#tooltip").transition().duration(200).style("opacity", .99);      
				
				d3.select("#tooltip").html(toolTip(p.n, data[p.id]))  
					.style("left", (d3.event.pageX) - 20 + "px")     
					.style("top", (d3.event.pageY - 180) + "px");
			}
			
			function mouseOut(){
				d3.select("#tooltip").transition().duration(100000).style("opacity", 0);      
			}	
			
			d3.select(id).selectAll(".state")
				.data($scope.stateBoundaries)
				.enter()
				.append("path")
				.attr("class","state")
				.attr("d", function(p){ return p.d;})
				.style("fill",function(p){ return $scope.data[p.id].color; })
				.on("mouseover", mouseOver).on("mouseout", mouseOut);
		}

		$scope.states = states;

		// Draw states on the state svg
        $scope.draw("#statesvg", $scope.data, $scope.tooltipFunction);

        // We could keep track of a selected state, on click, etc
        scope.$watch('exp', function (newVal, oldVal) {
            // ...
        });
    }
  };
});