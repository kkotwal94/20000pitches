import $ from 'jquery';

const utils = {
  /*
   * @param {Object} payload to be sent to server
   * @return {Promise}
   */

  getProfile: () => {
    return $.ajax({
      url:'/getProfile',
      type: 'GET'
    });
  },

  updateProfile: (data) => {
    return $.ajax({
      url: '/updateProfile',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  }

};

export default utils;
