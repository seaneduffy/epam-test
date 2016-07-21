'use strict';

(function() {
	
require('angular');

var app = angular.module('blog', [])
	.controller('main', ['$scope', '$http', function($scope, $http) {
		
		var serverRoot = 'http://jsonplaceholder.typicode.com';
		
		$scope.showComments = showComments;
		$scope.hideComments = hideComments;
		$scope.editPost = editPost;
		$scope.confirmEditPost = confirmEditPost;
		$scope.confirmDeletePost = confirmDeletePost;
		$scope.finishEditPost = finishEditPost;
		$scope.finishDeletePost = finishDeletePost;
		$scope.savedPost = {
			title: '',
			body: ''
		}
		$scope.error = false;
		$scope.editing = false;
		$scope.deleting = false;
		
		$http({
			method: 'GET',
			url: serverRoot + '/posts/?_limit=20'
		}).then(function(response) {
			
			$scope.posts = response.data.map(function(post){
				
				post.bodyDisplay = post.body.split(/\n/g);
				post.editing = false;
				post.showComments = false;
				return post;
				
			});
			
		}, function(error) {
			
			$scope.error = error.status + ' ' + error.statusText;
			
		});
		
		function showComments(index) {
			
			var post = $scope.posts[index];
			
			if(typeof post.comments === 'undefined') {
				
				$http({
					method: 'GET',
					url: serverRoot + '/posts/'+(index+1)+'/comments/?_limit=10'
				}).then(function(response) {
					
					post.comments = response.data;
					post.showComments = true;
					
				}, function(error) {
					
					$scope.error = error.status + ' ' + error.statusText;
					
				});
				
			} else {
				
				post.showComments = true;
				
			}
		}
		
		function hideComments(index) {
			
			$scope.posts[index].showComments = false;
			
		}
		
		function confirmDeletePost(index) {
			$scope.deleteIndex = index;
			$scope.deleting = true;
		}
			
		function finishDeletePost(index) {
			
			$http({
				method: 'DELETE',
				url: serverRoot + '/posts/'+(index+1)
			}).then(function(response) {
				
				$scope.posts.splice(index, 1);
				
			}, function(error) {
				
				$scope.error = error.status + ' ' + error.statusText;
				
			});
			
		}
		
		function editPost(index) {
			var post = $scope.posts[index];
			$scope.savedPost.title = post.title;
			$scope.savedPost.body = post.body;
			post.editing = true;
			
		}
		
		function confirmEditPost(index) {
			
			$scope.editIndex = index;
			$scope.editing = true;
			
		}
		
		function finishEditPost(index) {
			
			var post = $scope.posts[index];
			post.title = $scope.savedPost.title;
			post.body = $scope.savedPost.body;
			
			var	serverPost = {
					id: post.id,
		    		title: post.title,
		    		body: post.body,
					userId: post.userId
				};
			
			updatePost(index, serverPost);
			
		}
		
		function updatePost(index, data) {
			
			$http({
				method: 'PUT',
				url: serverRoot + '/posts/'+(index+1),
				data: data
			}).then(function(response) {
				
				$scope.posts[index].bodyDisplay = $scope.posts[index].body.split(/\n/g);
				$scope.posts[index].editing = false;
				
			}, function(error) {
				
				$scope.error = error.status + ' ' + error.statusText;
				
			});
			
		}
		
	}]);
	
}());

