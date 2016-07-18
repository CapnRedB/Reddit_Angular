var app = angular.module( 'reddit', [ 'ngAnimate' ] );
app.controller( 'RedditC', function( $scope ) {
	$scope.newComment = {};
	$scope.newPost = {};
	$scope.view = {};
	$scope.view.search = "";
	$scope.newPostVisible = false;
	$scope.view.order = '-likes';
	$scope.view.posts = [ {
		user: "Marc",
		title: "Another Reddit Clone",
		likes: 12,
		description: 'Dumb reddit clone',
		date: moment().subtract( 5, 'days' ).calendar(),
		imgurl: "https://www.placecage.com/200/200",
		comments: [ {
			user: "Aaron",
			comment: "This sucks"
		}, {
			user: "Dax",
			comment: "I agree"
		} ]
	}, {
		user: "Robert",
		title: "Dumb Reddit",
		likes: -3,
		description: 'Dumb reddit clone',
		date: moment().calendar(),
		imgurl: "https://www.placecage.com/200/200",
		comments: [ {
			user: "Aaron",
			comment: "This sucks"
		}, {
			user: "Dax",
			comment: "I agree"
		} ]
		} ];
	$scope.upVote = function( post ) {
		post.likes++;
	}
	$scope.downVote = function( post ) {
		post.likes--;
	}
	$scope.toggleComment = function( post ) {
		post.commentsVisible = !post.commentsVisible;
	};

	$scope.toggleNewComment = function( post ) {
		$scope.view.posts.forEach( function( otherPost ) {
			if ( otherPost !== post ) {
				otherPost.newCommentVisible = false;
			} else {
				otherPost.newCommentVisible = !otherPost.newCommentVisible;
			}
		} );
		$scope.newComment = {};
	};

	$scope.togglePost = function() {
		$scope.view.newPostVisible = !$scope.view.newPostVisible;
	};

	$scope.addComment = function( post, comment ) {
		if ( comment.user && comment.comment ) {
			post.comments.push( comment );
			post.newCommentVisible = false;
			$scope.newComment = {};
		}
	};

	$scope.addPost = function( post ) {
		post.date = moment().calendar();
		post.likes = 0;
		post.comments = [];
		post.commentsVisible = false;
		post.newCommentVisible = false;
		$scope.view.posts.push( post );
		$scope.view.newPostVisible = false;
		$scope.newPost = {};
		$scope.postForm.$setUntouched();
	};

	$scope.checkForError = function( field ) {
		return field.$invalid && field.$touched;
	};
	$scope.upvoteClass = function( post ) {
		if ( post.likes > 0 ) {
			return "positive";
		} else if ( post.likes < 0 ) {
			return "negative";
		} else {
			return "";
		}
	};
} )
