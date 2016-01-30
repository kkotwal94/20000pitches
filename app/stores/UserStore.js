import Immutable from 'immutable';
import UserActions from 'actions/UserActions';
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
class UserStore {

  /*
   * The constructor of your store definition receives the alt instance as its first and only argument. All instance variables,
   * values assigned to `this`, in any part of the StoreModel will become part of state.
   */
  constructor() {
    // Instance variables defined anywhere in the store will become the state. You can initialize these in the constructor and
    // then update them directly in the prototype methods
    this.user = Immutable.Map({});

    // (lifecycleMethod: string, handler: function): undefined
    // on: This method can be used to listen to Lifecycle events. Normally they would set up in the constructor
    this.on('init', this.bootstrap);
    this.on('bootstrap', this.bootstrap);

    // (listenersMap: object): undefined
    // bindListeners accepts an object where the keys correspond to the method in your
    // StoreModel and the values can either be an array of action symbols or a single action symbol.
    // Remember: alt generates uppercase constants for us to reference
    this.bindListeners({
      handleLoginAttempt: UserActions.MANUALLOGIN,
      handleLoginSuccess: UserActions.LOGINSUCCESS,
      handleLoginError:UserActions.LOGINERROR,
      handleLogoutAttempt: UserActions.LOGOUT,
      handleLogoutSuccess: UserActions.LOGOUTSUCCESS,
      handleRegisterAttempt: UserActions.REGISTER,
      handleRegisterSuccess: UserActions.REGISTER_SUCCESS,
      handleRegisterError: UserActions.REGISTER_ERROR,
      handleGetProfile: UserActions.GET_PROFILE,
      handleGetProfileSuccess: UserActions.GET_PROFILE_SUCCESS,
      handleGetProfileError: UserActions.GET_PROFILE_ERROR,
      handleProfileUpdate: UserActions.UPDATE_PROFILE,
      handleProfileUpdateSuccess: UserActions.PROFILE_UPDATE_SUCCESS,
      handleProfileUpdateError: UserActions.PROFILE_UPDATE_ERROR
    });
  }

  bootstrap() {
    if (!Immutable.Map.isMap(this.user)) {
      this.user = Immutable.fromJS(this.user);
    }
  }

  handleLoginAttempt() {
    this.user = this.user.set('isWaiting', true);
    this.emitChange();
  }


  handleLoginSuccess() {
    this.user = this.user.merge({ isWaiting: false, authenticated: true });
    this.emitChange();
  }

  handleLoginError() {
    this.user = this.user.merge({isWaiting: false, authenticated: false, loginError: true});
    console.log("loginerror");
    this.emitChange();
  }

  handleRegisterAttempt() {
    this.user = this.user.set('isSigningUp', true);
    this.emitChange();
  }

  handleRegisterSuccess() {
    this.user = this.user.merge({ isSigningUp: false, authenticated: true});
    this.emitChange();
  }

  handleRegisterError() {
    this.user = this.user.merge({isSigningUp: false, authenticated: false, signupError: true});
    console.log("signupError");
    this.emitChange();
  }

  handleLogoutAttempt() {
    this.user = this.user.set('isWaiting', true);
    this.emitChange();
  }

  handleLogoutSuccess() {
    this.user = this.user.merge({ isWaiting: false, authenticated: false });
    this.emitChange();
  }

  handleGetProfile() {
    this.emitChange();
  }

  handleGetProfileSuccess(data) {
    this.user = this.user.merge({data});
    this.emitChange();
  }

  handleGetProfileError(errorMessage) {
    this.emitChange(errorMessage);
  }

  handleProfileUpdate() {
    this.emitChange();
  }

  handleProfileUpdateSuccess(data){
    if (data.firstName == "") {
        data.firstName = this.user.get('data').get('firstName');
    }
    if (data.lastName == "") {
        data.lastName = this.user.get('data').get('lastName');
    }
      
    if (data.website == "") {
        data.section = this.user.get('data').get('website');
    }
    if (data.gender == "") {
        data.gender = this.user.get('data').get('gender');
    }
    if (data.location == "") {
        data.location = this.user.get('data').get('location');
    }


    this.user = this.user.updateIn(['profile','firstName'], x => data.firstName);
    this.user = this.user.updateIn(['profile','lastName'], x => data.lastName);
    this.user = this.user.updateIn(['profile','website'], x => data.website);
    this.user = this.user.updateIn(['profile','gender'], x => data.gender);
    this.user = this.user.updateIn(['profile','location'], x => data.location);

    this.user = this.user.updateIn(['data','firstName'], x => data.firstName);
    this.user = this.user.updateIn(['data','lastName'], x => data.lastName);
    this.user = this.user.updateIn(['data','website'], x => data.website);
    this.user = this.user.updateIn(['data','gender'], x => data.gender);
    this.user = this.user.updateIn(['data','location'], x => data.location);
    this.emitChange();
  }

  handleProfileUpdateError(errorMessage) {
    this.emitChange(errorMessage);
  }

}

// Export our newly created Store
export default alt.createStore(UserStore, 'UserStore');
