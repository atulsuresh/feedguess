var CommentList = React.createClass({
  render: function() {
      
      /*
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
*/
      
      
      if(this.props.data) {
          
          var giveresponse = getFeedResponse(this.props.data.aggregate.sentiment,this.props.data.aggregate.score,this.props.data.positive,this.props.data.negative);
          
          return (
            <div id="feedbackresponse"></div>         
          );
          
          
      }
      
      
 return(
<div id="feedbackresponse"><h3>Response</h3></div>      
 );
  }
    
        
  
      
      
});


var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    //var text = React.findDOMNode(this.refs.text).value.trim();
    if (!author) {
      return;
    }
    this.props.onCommentSubmit({text: author, apikey: "7e9820f7-6eef-41ce-b442-0cae95d1fdbc", language: "eng"});
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your Feedback" ref="author" />
        
        <input type="submit" value="Get Response" />
      </form>
    );
  }
});




var CommentBox = React.createClass({
  loadCommentsFromServer: function() {

      
      $.ajax({
        dataType: 'jsonp',
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
   
  },
  handleCommentSubmit: function(comment) {
      document.getElementById("feedbackresponse").innerHTML = "Loading.. Our bots are in search for the nuggets"; 
      
      $.ajax({
        
      url: this.props.url,
     
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
      
    
    });
  },
  getInitialState: function() {
    return {data: null};
  },
  componentDidMount: function() {
    //this.loadCommentsFromServer();
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="FeedbackSys container">
        <h1>Feedguess</h1>
        <h3>Enter the Feedback on the box below</h3>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        <CommentList data={this.state.data} />
        
      </div>
    );
  }
});


function getFeedResponse(stype,score,pos,neg) {
    console.log(stype + "  " + score + "  " + pos + "  " + neg);
    
   
    
    if(stype == "positive"){
        if(score > 0.6) {
            document.getElementById("feedbackresponse").innerHTML = "That Great News! " + pos[0].sentiment+"ness! We are truely glad you liked "+ pos[0].topic +" really well! Keep coming back. :)"; 
            console.log(score);
        }
        
        if(score > 0.4 && score <=0.6 ) {
            document.getElementById("feedbackresponse").innerHTML = "We loved the your word :" + pos[0].sentiment+"! hope we had "+ pos[0].topic +" really good! Tell us how to improve.  Keep coming back. :)"; 
            console.log("0.4 to 0.6 ",  score);
        }
        
        if(score<=0.4) {
            document.getElementById("feedbackresponse").innerHTML = "Thanks for the complement sir, But we understood we need to keep up still! Keep coming back. :)"; 
            console.log(score);
        }
    }
    
    else if(stype == "neutral") {
        //document.getElementById("feedbackresponse").innerHTML = "my Server is confused about your query. Anyway it seems as almost a good feedback. Thank you.";
        
        if(score<=0) {
            document.getElementById("feedbackresponse").innerHTML = "Sorry Sir. :( We'll improve our "+ neg[0].topic +" service. Our people are on it to make it better. Keep coming."; 
            console.log(score);
        }
        
        else {
        document.getElementById("feedbackresponse").innerHTML = "Thanks for the complement sir, But we understood we need to keep up still! Keep coming back. :)"; 
        }
        
    }
    
    else {
    
        score = Math.abs(score);
                if(score > 0.8) {
            document.getElementById("feedbackresponse").innerHTML = "We are extreamly sorry for really bad experiance you had with us. We're are tring to make our serivce better"; 
                    console.log(score);
        }
        
        if(score > 0.6 && score<=0.8 ) {
            document.getElementById("feedbackresponse").innerHTML = "Sorry, We have informed our managers about bad quality "+ neg[0].topic +" you recived! Tell us how to improve. We'll make your everything to be all right the next time you come here.  Keep coming back. :)"; 
            console.log(score);
        }
        
        if(score<=0.6) {
            document.getElementById("feedbackresponse").innerHTML = "Sorry Sir. :( We'll improve our "+ neg[0].topic +" service. Our people are on it to make it better. Keep coming."; 
            console.log(score);
        }
    
    }
    

    return 0;
   
}


React.render(
  <CommentBox url="https://api.idolondemand.com/1/api/sync/analyzesentiment/v1" pollInterval={2000} />,
  document.body
);