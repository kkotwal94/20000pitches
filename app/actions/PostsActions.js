import alt from 'altInstance';
import PostsWebAPIUtils from 'utils/PostsWebAPIUtils';

/*
 * Declaring UserActions using ES2015. This is equivalent to creating
 * function UserActions() {}
 * AND
 * UserActions.prototype.create() = function(data) {}
 */
class PostsActions {

	allPosts() {
	this.dispatch();
	PostsWebAPIUtils.allPosts().done((data) => {
      this.actions.allPostsSuccess(data);
    })
    .fail((errorMessage) => {
      this.actions.allPostsError(errorMessage);
    });
  }

  allPostsSuccess(data) {
  	this.dispatch(data);
  }

  allPostsError(error) {
  	this.dispatch(error);
  }

  getPosts(id) {
  	this.dispatch();
	PostsWebAPIUtils.getPosts(id).done((data) => {
      this.actions.getPostsSuccess(data);
    })
    .fail((errorMessage) => {
      this.actions.getPostsError(errorMessage);
    });
  }

  getPostsSuccess(data) {
  	this.dispatch(data);
  }

  getPostsError(error){
  	this.dispatch(error);
  }

  getNestedComments(id) {
  	this.dispatch();
  	PostsWebAPIUtils.getNestedComments(id).done((data) => {
      this.actions.getNestedCommentsSuccess(data);
    })
    .fail((errorMessage) => {
      this.actions.getNestedCommentsError(errorMessage);
    });
  }

  getNestedCommentsSuccess(data) {
  	this.dispatch(data);
  }

  getNestedCommentsError(error) {
  	this.dispatch(error);
  }

  upvotePost(id) {
  	PostsWebAPIUtils.upvotePost()
      .then((response, textStatus) => {
        if(textStatus === 'success') {
          this.actions.upvotePostSuccess();
        }
        if(textStatus === 'error') {
          this.actions.upvotePostError();
        }
      });
  }

  upvotePostSuccess() {
  	this.dispatch();
  }

  upvotePostError() { 
  	this.dispatch();
  }

  downvotePost(id) {

  }
}

export default alt.createActions(PostsActions);
