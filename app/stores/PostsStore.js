import Immutable from 'immutable';
import PostsActions from 'actions/PostsActions';
import alt from 'altInstance';

/**
 * Flux Explanation of Store:
 * Stores contain the application state and logic. Their role is somewhat similar to a model in a traditional MVC, but
 * they manage the state of many objects. Nor are they the same as Backbone's collections. More than simply managing a
 * collection of ORM-style objects, stores manage the application state for a particular domain within the application.
 *
 * A store registers itself with the dispatcher and provides it with a callback. This callback receives a data payload
 * as a parameter. The payload contains an action with an attribute identifying the action's type. Within the store's
 * registered callback, a switch statement based on the action's type is used to interpret the payload and to provide the
 * proper hooks into the store's internal methods. This allows an action to result in an update to the state of the store,
 * via the dispatcher. After all the stores are updated, they broadcast an event declaring that their state has changed,
 * so the views may query the new state and update themselves.
 *
 * Alt Implementation of Stores:
 * These are the stores returned by alt.createStore, they will not have the methods defined in your StoreModel because flux
 * stores do not have direct setters. However, any static methods defined in your StoreModel will be transferred to this object.
 *
 * Please note: Static methods defined on a store model are nothing more than synthetic sugar for exporting the method as a public
 * method of your alt instance. This means that `this` will be bound to the store instance. It is recommended to explicitly export
 * the methods in the constructor using StoreModel#exportPublicMethods.
 *
 */
class PostsStore {

  /*
   * The constructor of your store definition receives the alt instance as its first and only argument. All instance variables,
   * values assigned to `this`, in any part of the StoreModel will become part of state.
   */
  constructor() {
    // Instance variables defined anywhere in the store will become the state. You can initialize these in the constructor and
    // then update them directly in the prototype methods
    this.posts = [];
    this.singlePost = [];
    this.nestedComments = [];


    // (lifecycleMethod: string, handler: function): undefined
    // on: This method can be used to listen to Lifecycle events. Normally they would set up in the constructor
    this.on('init', this.bootstrap);
    this.on('bootstrap', this.bootstrap);

    // (listenersMap: object): undefined
    // bindListeners accepts an object where the keys correspond to the method in your
    // StoreModel and the values can either be an array of action symbols or a single action symbol.
    // Remember: alt generates uppercase constants for us to reference
    this.bindListeners({
      handleAllPosts: PostsActions.ALL_POSTS,
      handleAllPostsSuccess: PostsActions.ALL_POSTS_SUCCESS,
      handleAllPostsError: PostsActions.ALL_POSTS_ERROR,
      handleGetPosts: PostsActions.GET_POSTS,
      handleGetPostsSuccess: PostsActions.GET_POSTS_SUCCESS,
      handleGetPostsError: PostsActions.GET_POST_ERROR,
      handleGetNestedComments: PostsActions.GET_NESTED_COMMENTS,
      handleGetNestedCommentsSuccess: PostsActions.GET_NESTED_COMMENTS_SUCCESS,
      handleGetNestedCommentsError: PostsActions.GET_NESTED_COMMENTS_ERROR,
      handleUpvote: PostsActions.UPVOTE_POST,
      handleUpvoteSuccess: PostsActions.UPVOTE_POST_SUCCESS,
      handleUpvoteError: PostsActions.UPVOTE_POST_ERROR,
      handleDownvote: PostsActions.DOWNVOTE_POST,
      handleDownvoteSuccess: PostsActions.DOWNVOTE_POST_SUCCESS,
      handleDownvoteError: PostsActions.DOWNVOTE_POST_ERROR,
      handleEditPost: PostsActions.EDIT_POST,
      handleEditPostSuccess: PostsActions.EDIT_POST_SUCCESS,
      handleEditPostError: PostsActions.EDIT_POST_ERROR,
      handleAddNestedComment: PostsActions.ADD_NESTED_COMMENT,
      handleAddNestedCommentSuccess: PostsActions.ADD_NESTED_COMMENT_SUCCESS,
      handleAddNestedCommentError: PostsActions.ADD_NESTED_COMMENT_ERROR,
      handleRemovePost: PostsActions.REMOVE_POST,
      handleRemovePostSuccess: PostsActions.REMOVE_POST_SUCCESS,
      handleRemovePostError: PostsActions.REMOVE_POST_ERROR
    
    });
  }

  bootstrap() {/*
    if (!Immutable.Map.isMap(this.posts)) {
      this.posts = Immutable.fromJS(this.posts);
    }*/
  }

  handleAllPosts() {
    this.emitChange();
  }

  handleAllPostsSuccess(data) {
    this.posts = data;
    this.emitChange();
  }

  handleAllPostsError(error){
    this.emitChange(error);
  }

  handleGetPosts() {
    this.emitChange();
  }

  handleGetPostsSuccess(data) {
    this.singlePost = data;
  }

  handleGetPostsError(error) { 
    this.emitChange(error);
  }

  handleGetNestedComments() {
    this.emitChange();
  }

  handleGetNestedCommentsSuccess(data) {
    this.nestedComments = data;
    this.emitChange();
  }

  handleGetNestedCommentsError(error) {
    this.emitChange(error);
  }

  handleUpvote() {
    this.emitChange();
  }

  handleUpvoteSuccess(id) {
    this.emitChange();
  }

  handleUpvoteError(error) {
    this.emitChange();
  }

  handleDownvote() {
    this.emitChange();
  }

  handleDownvoteSuccess(id) {
    this.emitChange();
  }

  handleDownvoteError() {
    this.emitChange();
  }

  handleEditPost() {
    this.emitChange();
  }

  handleEditPostSuccess(uid, pid, data) {
    this.emitChange();
  }

  handleEditPostError() {
    this.emitChange();
  }

  handleAddNestedComment() {
    this.emitChange();
  }

  handleAddNestedCommentSuccess(id, data) {
    this.emitChange();
  }

  handleNestedCommentError() {
    this.emitChange();
  }

  handleRemovePost() {
    this.emitChange();
  }

  handleRemovePostSuccess() {
    this.emitChange();
  }

  handleRemovePostError() {
    this.emitChange();
  }

}

// Export our newly created Store
export default alt.createStore(PostsStore, 'PostsStore');
