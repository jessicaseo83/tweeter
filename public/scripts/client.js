/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




//
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const renderTweets = function(tweets) {
  $('.article-tweet').empty();
  for(let tweet of tweets) {
    $('.article-tweet').prepend(createTweetElement(tweet))
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
      <p>${escape(tweet.content.text)}</p>
    </div>
    <footer>
      <div>${moment(tweet.created_at, "").fromNow()}</div>
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
      // alert("It's too long!");
  
      $(".error").replaceWith("<div class='error'>⛔️ It's too long! (Max 140 Character) ⛔️</div>")
      $(".error").slideDown();
      return;

    } else if (input === "") {
     
      $(".error").replaceWith("<div class='error'>⛔️ It's too short! Humming more! ⛔️</div>")
      $(".error").slideDown();
      return;

    } else if (input === null) {
      
      $(".error").replaceWith("<div class='error'>⛔️ I don't know what you want to say. Please try again! ⛔️</div>")
      $(".error").slideDown();
      return;
    } else {
      $(".error").slideUp();
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize()
      }).then(function(data) {
        $("textarea").val('');
        $(".counter").val(140);
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




