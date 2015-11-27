var express = require('express');
var api = require('instagram-node').instagram();
var router = express.Router();

// Render page
router.get('/', function(req, res, next) {
  res.render('about');
});

api.use({
  client_id: '7949d7e563b8403e9e41a84d217ddfd',
  client_secret: '7d43964c2570492cb4ad2e5ec55a2faa'
});

var redirect_uri = 'http://yourockdude.herokuapp.com/about/handleauth';

exports.authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
};

exports.handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send('Didn\'t work');
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      res.send('You made it!!');
    }
  });
};

// This is where you would initially send users to authorize
router.get('/authorize_user', exports.authorize_user);
// This is your redirect URI
router.get('/handleauth', exports.handleauth);

module.exports = router;

// EXAMPLE
// var http = require('http');
// var express = require('express');
// var api = require('instagram-node').instagram();
// var app = express();
//
// app.configure(function() {
//   // The usual...
// });
//
// api.use({
//   client_id: YOUR_CLIENT_ID,
//   client_secret: YOUR_CLIENT_SECRET
// });
//
// var redirect_uri = 'http://yoursite.com/handleauth';
//
// exports.authorize_user = function(req, res) {
//   res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
// };
//
// exports.handleauth = function(req, res) {
//   api.authorize_user(req.query.code, redirect_uri, function(err, result) {
//     if (err) {
//       console.log(err.body);
//       res.send("Didn't work");
//     } else {
//       console.log('Yay! Access token is ' + result.access_token);
//       res.send('You made it!!');
//     }
//   });
// };
//
// // This is where you would initially send users to authorize
// app.get('/authorize_user', exports.authorize_user);
// // This is your redirect URI
// app.get('/handleauth', exports.handleauth);
//
// http.createServer(app).listen(app.get('port'), function(){
//   console.log("Express server listening on port " + app.get('port'));
// });

// API
// #<{(|******************************|)}>#
// #<{(|            USERS             |)}>#
// #<{(|******************************|)}>#
// ig.user('user_id', function(err, result, remaining, limit) {});
//
// #<{(| OPTIONS: { [count], [min_id], [max_id] }; |)}>#
// ig.user_self_feed([options,] function(err, medias, pagination, remaining, limit) {});
//
// #<{(| OPTIONS: { [count], [min_timestamp], [max_timestamp], [min_id], [max_id] }; |)}>#
// ig.user_media_recent('user_id', [options,] function(err, medias, pagination, remaining, limit) {});
//
// #<{(| OPTIONS: { [count], [min_timestamp], [max_timestamp], [min_id], [max_id] }; |)}>#
// ig.user_self_media_recent([options,] function(err, medias, pagination, remaining, limit) {});
//
// #<{(| OPTIONS: { [count], [max_like_id] }; |)}>#
// ig.user_self_liked([options,] function(err, medias, pagination, remaining, limit) {});
//
// #<{(| OPTIONS: { [count] }; |)}>#
// ig.user_search('username', [options,] function(err, users, remaining, limit) {});
//
// #<{(|******************************|)}>#
// #<{(|         RELATIONSHIP         |)}>#
// #<{(|******************************|)}>#
// #<{(| OPTIONS: { [count], [cursor] }; |)}>#
// ig.user_follows('user_id', function(err, users, pagination, remaining, limit) {});
//
// #<{(| OPTIONS: { [count], [cursor] }; |)}>#
// ig.user_followers('user_id', function(err, users, pagination, remaining, limit) {});
//
// ig.user_self_requested_by(function(err, users, remaining, limit) {});
//
// ig.user_relationship('user_id', function(err, result, remaining, limit) {});
//
// ig.set_user_relationship('user_id', 'follow', function(err, result, remaining, limit) {});
//
// #<{(|******************************|)}>#
// #<{(|           MEDIAS             |)}>#
// #<{(|******************************|)}>#
// ig.media('media_id', function(err, media, remaining, limit) {});
//
// #<{(| OPTIONS: { [min_timestamp], [max_timestamp], [distance] }; |)}>#
// ig.media_search(48.4335645654, 2.345645645, [options,] function(err, medias, remaining, limit) {});
//
// ig.media_popular(function(err, medias, remaining, limit) {});
//
// #<{(|******************************|)}>#
// #<{(|           COMMENTS           |)}>#
// #<{(|******************************|)}>#
// ig.comments('media_id', function(err, result, remaining, limit) {});
//
// ig.add_comment('media_id', 'your comment', function(err, result, remaining, limit) {});
//
// ig.del_comment('media_id', 'comment_id', function(err, remaining, limit) {});
//
// #<{(|******************************|)}>#
// #<{(|            LIKES             |)}>#
// #<{(|******************************|)}>#
// ig.likes('media_id', function(err, result, remaining, limit) {});
//
// ig.add_like('media_id', function(err, remaining, limit) {});
//
// ig.del_like('media_id', function(err, remaining, limit) {});
//
// #<{(|******************************|)}>#
// #<{(|             TAGS             |)}>#
// #<{(|******************************|)}>#
// ig.tag('tag', function(err, result, remaining, limit) {});
//
// #<{(| OPTIONS: { [min_tag_id], [max_tag_id] }; |)}>#
// ig.tag_media_recent('tag', [options,] function(err, medias, pagination, remaining, limit) {});
//
// ig.tag_search('query', function(err, result, remaining, limit) {});
//
// #<{(|******************************|)}>#
// #<{(|           LOCATIONS          |)}>#
// #<{(|******************************|)}>#
// ig.location('location_id', function(err, result, remaining, limit) {});
//
// #<{(| OPTIONS: { [min_id], [max_id], [min_timestamp], [max_timestamp] }; |)}>#
// ig.location_media_recent('location_id', [options,] function(err, result, pagination, remaining, limit) {});
//
// #<{(| SPECS: { lat, lng, [foursquare_v2_id], [foursquare_id] }; |)}>#
// #<{(| OPTIONS: { [distance] }; |)}>#
// ig.location_search({ lat: 48.565464564, lng: 2.34656589 }, [options,] function(err, result, remaining, limit) {});
//
// #<{(|******************************|)}>#
// #<{(|          GEOGRAPHIES         |)}>#
// #<{(|******************************|)}>#
// #<{(| OPTIONS: { [min_id], [count] } |)}>#
// ig.geography_media_recent(geography_id, [options,] function(err, result, pagination, remaining, limit) {});
//
// #<{(|******************************|)}>#
// #<{(|         SUBSCRIPTIONS        |)}>#
// #<{(|******************************|)}>#
// ig.subscriptions(function(err, result, remaining, limit){});
//
// ig.del_subscription({id:1}, function(err,subscriptions,limit){})
//
// #<{(| OPTIONS: { [verify_token] } |)}>#
// ig.add_tag_subscription('funny', 'http://MYHOST/tag/funny', [options,] function(err, result, remaining, limit){});
//
// #<{(| OPTIONS: { [verify_token] } |)}>#
// ig.add_geography_subscription(48.565464564, 2.34656589, 100, 'http://MYHOST/geography', [options,] function(err, result, remaining, limit){});
//
// #<{(| OPTIONS: { [verify_token] } |)}>#
// ig.add_user_subscription('http://MYHOST/user', [options,] function(err, result, remaining, limit){});
//
// #<{(| OPTIONS: { [verify_token] } |)}>#
// ig.add_location_subscription(1257285, 'http://MYHOST/location/1257285', [options,] function(err, result, remaining, limit){});
