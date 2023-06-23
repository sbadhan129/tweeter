/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

$(document).ready(function(){
//$('time.timeago').timeago();
  const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const createTweetElement = function(tweet) {
  const $tweet = $(`
    <article class="tweet">
      <header>
        <span class="user">
          <img src="${tweet.user.avatars}" alt="User Image">
          <span class="name">${tweet.user.name}</span>
        </span>
        <span class="handle">${tweet.user.handle}</span>
      </header>
      <p>${tweet.content.text}</p>
      <footer>
        <span class="date">${moment(tweet.created_at).fromNow()}</span>
        <span class="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>
    </article>
  `);
  return $tweet;
}

const renderTweets = function(tweets) {
  const $tweetsContainer = $('#tweets-container');

  // This will clear existing tweets
  $tweetsContainer.empty();

  // Looping through the tweets
  tweets.forEach(tweet => {
    // Call to createTweetElement for each tweet we put
    const $tweet = createTweetElement(tweet);

    // Appending the tweet element to the tweets container
    $tweetsContainer.append($tweet);
  });
}


$('form').on('submit', function(event) {
event.preventDefault();
let formData = $(this).serialize();
$.ajax({
  url: 'http://localhost:8080/tweets/',
      method: 'POST',
      data: formData,
      success: function(){
        console.log('Data is sent to the server: ', formData);
        $('textarea').val('');
        $.getJSON('/tweets', function(updatedData) {
          renderTweets(updatedData);
        });
      },
      error: function(){
        console.error('There is an error in sending a data');
      }
});
});
// Calling the renderTweets with the data array given above
renderTweets(data);
});
