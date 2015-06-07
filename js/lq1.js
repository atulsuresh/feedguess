


var firebaseApp = "https://intense-inferno-2136.firebaseio.com/";

var center = [10.055372, 76.351962];

var globalPosRad = 100;



var SingleStoreBox = React.createClass({
    
    render: function() {
        
               
                var long = this.props.storelon;
                var lati = this.props.storelat;
                var distancebtwcenter = findDistanceRange(center,lati,long);
                console.log(distancebtwcenter + " " + long + " " + lati);
       
        
        if(distancebtwcenter < globalPosRad )
        {
        
        return (
           
        
            <div className="store-propr1">
                <h1>{this.props.storename}</h1>
                <h2>{this.props.storetype}</h2>
            </div>
           
            );
        }
        
        else {
        return(
            <div></div>
        );
        }
        
         console.log("fucked me up firebase");
            hello();
    }

});


var StoreBoxes = React.createClass({
    render: function() {
      
            var storeNode = this.props.data.map(function(data, index) {
            
                
                return <SingleStoreBox key={index} storename={data.name} storetype={data.type} storelon={data.lon} storelat={data.lat} ></SingleStoreBox>;
            });
        
            return (
            <div>{storeNode}</div>
               
            );
        
      console.log("fucked up storeboxes");   
    }
});



var StoreMain = React.createClass({
    mixins : [ReactFireMixin],
    
    getInitialState: function() {
        return { data: [] };
    },
    
     componentWillMount: function() {
          // Here we bind the component to Firebase and it handles all data updates,
          // no need to poll as in the React example.
         
         
            
          this.bindAsArray(new Firebase(firebaseApp + "Stores"), "data");
         hello();
         console.log("fucked up firebase");
         
        },
    
    render: function() {
        return (    
        <StoreBoxes data={this.state.data} />
        );
    }
});

React.render(<StoreMain />,document.getElementById('stores-box'));


function findDistanceRange(centr,lat,lon){
    Math.radians = function(degrees) {
      return degrees * Math.PI / 180;
    };


    distancerange = 3959 * Math.acos( Math.cos( Math.radians(center[0])) * Math.cos( Math.radians(lat)) * Math.cos( Math.radians(lon) - Math.radians(center[1])) + Math.sin(Math.radians(center[0])) * Math.sin(Math.radians(lat)));
    
    return distancerange;
}



function hello(lon,lat) {
document.getElementById("map-canvas").innerHTML = "hello " + lon + lat;
}



/**** Google Maps ****/

