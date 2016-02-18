import $ from 'jquery';

const utils = {
  /*
   * @param {Object} payload to be sent to server
   * @return {Promise}
   */

  allPosts: () => {
    return $.ajax({
      url:'/allPosts',
      type: 'GET'
    });
  },

  getPosts: (id) => {
    return $.ajax({
      url:'/posts/' + id + '/getPost',
      type: 'GET'
    });
  },

  getNestedComments: (id) => {
      return $.ajax({
      url:'/posts/' + id + '/getPost/comments',
      type: 'GET'
    });
  },

  upvotePost: (id) => {
    return $.ajax({
      url: '/posts/'+ id + '/upvote',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },

  downvotePost: (id) => {
    return $.ajax({
      url: '/posts/'+ id + '/downvote',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },

  upvotePost: (uid, pid) => {
    return $.ajax({
      url: '/edit/'+ uid+ '/' + pid,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  
  },

  addNestedComment: (id) => {
    return $.ajax({
      url: '/posts/' + id,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  },

  removePost: (uid, pid) => {
    return $.ajax({
      url: '/posts/delete/' + uid+ '/' + pid,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  }


};

export default utils;
