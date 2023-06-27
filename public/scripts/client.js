/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

$(document).ready(function(){
//$('time.timeago').timeago();

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
      <p>${escape(tweet.content.text)}</p>
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
    $tweetsContainer.prepend($tweet);
  });
}

const loadTweets = function() {
  $.ajax({
    url: 'http://localhost:8080/tweets/',
    method: 'GET',
    dataType: 'json',
    success: function(tweets) {
      // Passing the tweets to renderTweets function
      renderTweets(tweets);
    },
    error: function(error) {
      console.error('There is an error in loading the tweets', error);
    }
  });
};
loadTweets();

$('form').on('submit', function(event) {
event.preventDefault();

let tweetMsg = $(this).find('textarea').val();

//check if the tweet is empty or exceeds its character limit
if(tweetMsg === '' || tweetMsg === null){
  $('#error-Message').text('Error: There is nothing to tweet!');
  $('#error-Message').slideDown();
 // alert('Error: There is nothing to tweet!');
  return;
 } else if(tweetMsg.length >140) {
  $('#error-Message').text('Error: This tweet exceeds its character limit!');
  $('#error-Message').slideDown();
  //alert('Error: This tweet exceeds its character limit!');
return;
}

//Serialization Process
let formData = $(this).serialize();
$.ajax({
  url: 'http://localhost:8080/tweets/',
      method: 'POST',
      data: formData,
      success: function(){
        console.log('Data is sent to the server: ', formData);
        $('textarea').val('');
        $('#error-Message').hide();
        loadTweets();
      },
      error: function(){
        console.error('There is an error in sending a data');
      }
});
});
loadTweets();
});
