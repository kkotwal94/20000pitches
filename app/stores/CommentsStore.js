import Immutable from 'immutable';
import CommentsActions from 'actions/CommentsActions';
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
class CommentsStore {

  /*
   * The constructor of your store definition receives the alt instance as its first and only argument. All instance variables,
   * values assigned to `this`, in any part of the StoreModel will become part of state.
   */
  constructor() {
    // Instance variables defined anywhere in the store will become the state. You can initialize these in the constructor and
    // then update them directly in the prototype methods
    this.comments = Immutable.Map({});

    // (lifecycleMethod: string, handler: function): undefined
    // on: This method can be used to listen to Lifecycle events. Normally they would set up in the constructor
    this.on('init', this.bootstrap);
    this.on('bootstrap', this.bootstrap);

    // (listenersMap: object): undefined
    // bindListeners accepts an object where the keys correspond to the method in your
    // StoreModel and the values can either be an array of action symbols or a single action symbol.
    // Remember: alt generates uppercase constants for us to reference
    this.bindListeners({
      handleGetComment: CommentsActions.GET_COMMENT,
      handleGetCommentSuccess: CommentsActions.GET_COMMENT_SUCCESS,
      handleGetCommentError: CommentsActions.GET_COMMENT_ERROR,
      handleCreateComment: CommentsActions.CREATE_COMMENT,
      handleCreateCommentSuccess: CommentsActions.CREATE_COMMENT_SUCCESS,
      handleCreateCommentError: CommentsActions.CREATE_COMMENT_ERROR,
      handleEditComment: CommentsActions.EDIT_COMMENT,
      handleEditCommentSuccess: CommentsActions.EDIT_COMMENT_SUCCESS,
      handleEditCommentError: CommentsActions.EDIT_COMMENT_ERROR,
      handleUpvoteComment: CommentsActions.UPVOTE_COMMENT,
      handleUpvoteCommentSuccess: CommentsActions.UPVOTE_COMMENT_SUCCESS,
      handleUpvoteCommentError: CommentsActions.UPVOTE_COMMENT_ERROR,
      handleDownvoteComment: CommentsActions.DOWNVOTE_COMMENT,
      handleDownvoteCommentSuccess: CommentsActions.DOWNVOTE_COMMENT_SUCCESS,
      handleDownvoteCommentError: CommentsActions.DOWNVOTE_COMMENT_ERROR,
      handleDeleteComment: CommentsActions.DELETE_COMMENT,
      handleDeleteCommentSuccess: CommentsActions.DELETE_COMMENT_SUCCESS,
      handleDeleteCommentError: CommentsActions.DELETE_COMMENT_ERROR

    });
  }

  bootstrap() {
    if (!Immutable.Map.isMap(this.user)) {
      this.comments = Immutable.fromJS(this.comments);
    }
  }

  handleGetComment() {
    this.emitChange();
  }

  handleGetCommentSuccess(data) {
    this.emitChange();
  }

  handleGetCommentError() {
    this.emitChange();
  }

  handleCreateComment() {
    this.emitChange();
  }

  handleCreateCommentSuccess(data) {
    this.emitChange();
  }

  handleCreateCommentError() {
    this.emitChange();
  }

  handleEditComment() {
    this.emitChange();
  }

  handleEditCommentSuccess(data) {
    this.emitChange();
  }

  handleEditCommentError() {
    this.emitChange();
  }

  handleUpvoteComment() {
    this.emitChange();
  }

  handleUpvoteCommentSuccess(commentid) {
    this.emitChange();
  }

  handleUpvoteCommentError() {
    this.emitChange();
  }

  handleDownvoteComment() {
    this.emitChange();
  }

  handleDownvoteCommentSuccess(commentid) {
    this.emitChange();
  }

  handleDownvoteCommentError() {
    this.emitChange();
  }

  handleDeleteComment() {
    this.emitChange();
  }

  handleDeleteCommentSuccess() {
    this.emitChange();
  }

  handleDeleteCommentError() {
    this.emitChange();
  }

}


// Export our newly created Store
export default alt.createStore(CommentsStore, 'CommentsStore');
