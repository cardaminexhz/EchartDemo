var allAreas = [{
			name:'北京市',
			code:'11',
			items:[{
				code:'110100',
				name:'市辖区',
				items:[{
					code:'110101',
					name:'东城区'
				},{
					code:'110102',
					name:'西城区'
				}]
			},{
					code:'110200',
					name:'县',
					items:[{
						code:'110228',
						name:'密云县'
					},{
						code:'110229',
						name:'延庆县'
					}]
			}]
		},{
			name:'湖北省',
			code:'11',
			items:[{
				code:'110100',
				name:'市',
				items:[{
					code:'110101',
					name:'武汉市'
				},{
					code:'110102',
					name:'荆州市'
				}]
			},{
					code:'110200',
					name:'区',
					items:[{
						code:'110228',
						name:'洪山区'
					},{
						code:'110229',
						name:'沙市区'
					}]
			}]
		}]


 function MyCntrl($scope) {
		$scope.areasArr = allAreas;
		$scope.areaItem = $scope.areasArr[0];
		//watcth 监听数据，当areaItem选项框的数据改变时，调用funcation
		$scope.$watch('areaItem', function(val){
			$scope.areaNext = val.items;
			$scope.areaNextItem = $scope.areaNext[0];
		});

		$scope.$watch('areaNextItem', function(val){
			$scope.gareaNext = val.items;
			$scope.gareaNextItem = $scope.gareaNext[0];
		});
  }
