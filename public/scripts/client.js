/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const data = [{
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png"
    ,
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
    "handle": "@rd" },
  "content": {
    "text": "Je pense , donc je suis"
  },
  "created_at": 1461113959088
}]

const renderTweets = function(tweets) {
  for(let tweet of tweets) {
    $('.article-tweet').append(createTweetElement(tweet))
  }
}

const createTweetElement = function(tweet) {

  let newTweet = `
  <article>
    <header>
      <div class="name"><img src=${tweet.user.avatars}>${tweet.user.name}</div>
      <div class="handle">${tweet.user.handle}</div>
    </header>
    <div class="tweet">
      ${tweet.content.text}
    </div>
    <footer>
      <div>10 days ago</div>
      <div class="btns"><img src="/images/flag.png"><img src="/images/retweet.png"><img src="/images/heart.png"></div>
    </footer>
  </article>
  `
  return newTweet;
}

// const $tweet = createTweetElement(exampleTweet);
// console.log($tweet);
// $('.article-tweet').append($tweet);


$(document).ready(function () {

  
  $('form').submit (function(event) {
    event.preventDefault();
    const input = $("textarea").val();
    
  
    if (input.length > 140) {
      alert("It's too long!");
      return;
    } else if (input === "") {
      alert("It's too short!");
      return;
    } else if (input === null) {
      alert("I don't know what you want to say. Please try again!");
      return;
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize()
      }).then(function(data) {
        console.log('Submitted')
        loadTweets();
      })
    }
  })
  
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        console.log("Success");
        renderTweets(data)
      }
    })
    
  };
  loadTweets();
})




