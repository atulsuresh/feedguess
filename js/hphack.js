
/*
var ImageCollect = React.createClass({
        getInitialState: function() {
          return {
            pImage: []
          };
        },

        componentDidMount: function() {
          var self = this;
          $.get(this.props.source, function(result) {
            var collection = result.data.children;
              console.log(collection);
            if (this.isMounted()) {
              this.setState({
                pImage: collection
              });
            }
          }.bind(this));
        },

        render: function() {
          images = this.state.pImage || [];
          return (
            <div>
              Images: 
              {images.map(function(image){
                  return <img src={image.data.thumbnail}/>
              })}
            </div>
          );
        }
      });


*/
https://api.idolondemand.com/1/api/sync/analyzesentiment/v1?text=I+am+really+annoyed+with+your+poor+performance+recently&language=eng&apikey=7e9820f7-6eef-41ce-b442-0cae95d1fdbc


var apiSource = "api.idolondemand.com/1/api/sync/analyzesentiment/v1"
var Feedbackform = React.createClass({
    
    getInitialState: function(){
       return {data: []};
    },
    
    handleSubmit: function(e) {
        e.preventDefault;
        console.log(feedtext);
        var feedtext = React.findDOMNode(this.refs.userfeedback).value.trim();
        
        if(!feedtext) {
            return;
        }
        
        this.props.onCommentSubmit({author: author, text: text});
        
     $.ajax({
      url: apiSource,
      dataType: 'json',
      type: 'POST',
      data: {text: feedtext, language: "eng", apikey: "7e9820f7-6eef-41ce-b442-0cae95d1fdbc"},
      success: function(data) {
        this.setState({data: data});
          console.log("fucking sucess",data)
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(apiSource, status, err.toString());
      }.bind(this)
    });
        
        React.findDOMNode(this.refs.userfeedback).value = '';
    },
    
    render: function() {
        
        return (
    <form className="commentForm" onSubmit={this.handleSubmit}>
        <input id="input-full-w" type="text" placeholder="Your FeedBack" ref="userfeedback" />
            <input type="submit" value="Get Result" />
      </form>

            
        );
    }
});


    React.render(
    <Feedbackform />,
      document.body
    );














