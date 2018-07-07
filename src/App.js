import React, { Component } from 'react';
import Map from './Components/Map'
import Sidebar from "./Components/Sidebar";
//React App componenet class
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //map
            map: '',
            //location info
            info: '',
            //Define locations of markers
            markers: [{
                    lat: 24.711925,
                    long: 46.675590,
                    name: 'Kingdom Tower'
                },
                {
                    lat: 24.689512,
                    long: 46.685339,
                    name: 'Al Faisaliah Mall',
                },
                {
                    lat: 24.692540,
                    long: 46.669535,
                    name: 'Panorama Mall'
                },
                {
                    lat: 24.697597,
                    long: 46.682872,
                    name: 'Bateel Cafe'
                },

                {
                    lat: 24.694305,
                    long:46.722594,
                    name: 'Wooden Bakery'
                },

            ],
            defultMarkers: []
        };
//Using this binding to make `this` work in the callback
          this.initializationMap = this.initializationMap.bind(this);
          this.createMarkers = this.createMarkers.bind(this);
         this.openMarker = this.openMarker.bind(this);
    }

////////function to Create the map by calling google api///////////
componentDidMount() {
  //gm_authFaliure function should be able to catch the errors
  window.gm_authFailure = function() {
   alert('Google maps failed to load!');
}
window.initializationMap = this.initializationMap;
const googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyC36rhwahGvbFMy01utzj0aVDCcZ6SbB9c&libraries=places&callback=initializationMap';
//create the script element for google map link
let script = document.createElement('script');
 script.type = 'text/javascript';
script.src = googleMapURL;
script.async = true;
//if the error is happened during the map loading we  error message is displayed
script.onerror = function () {
      document.write("Google Map can't be loaded");
  };
 document.body.appendChild(script);
  }

/////////////initializationMap function////////////////////////////
 initializationMap() {
            let map;
            map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: { lat: 24.711925, lng: 46.715417 }
            });
            // InfoWindow attach the information of to marker
            var infowindow = new window.google.maps.InfoWindow({});
            this.setState({ map: map, info: infowindow });
            this.createMarkers(map);
        }
        ///////////////////////////
        //to add the markers
    createMarkers(map) {
            let markerFunction = this;
            this.state.markers.forEach(marker => {
                const loc = { lat: marker.lat, lng: marker.long }
                let mark = new window.google.maps.Marker({
                    position: loc,
                    map: map,
                    title: marker.name
                });
                mark.addListener('click', function() {
                    markerFunction.openMarker(mark);
                });
                //push to search about marker
                let Markers = this.state.defultMarkers;
                Markers.push(mark);
                //set the value of targer markers
                this.setState({ defultMarkers: Markers });
            });
        }
        ////////////////openMarker Function////////////////////////////
    openMarker(marker) {
    //Define the client ID and clien secret to use four sequare API
            const clientId = "YLCL43LDII4P4TXTBAP2DV53V122ZWXSXCKB0S1JFC00DVXN\n";
            const clientSecret = "K2RL2RBQ15ZJOBINTMBWLQ2BKPAM2ZV4BU0S0HZZTH3MHTAJ\n";
            const url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";

              this.state.info.marker = marker;
              this.state.info.open(this.state.map, marker);
                    //set the animation fortarget marker
                marker.setAnimation(window.google.maps.Animation.BOUNCE);
                //set time out of removing the marker's animation
                  window.setTimeout(function() {
                       marker.setAnimation(null);
                     }, 40);
                   //close the info window event
                this.state.info.addListener('closeClick', function() {
                this.state.info.setMarker(null);
                });
              //set the marker info
                this.markerInfo(url);
        }
  ///////////set the marker info Function//////////////////////////////////////////////////
markerInfo(url) {
    let markerInfo = this.state.info;
    fetch(url)
        .then(function (resp) {
          if (!resp.ok) {
                const err = "Can't load data...";
                this.state.info.setContent(err);
               }
            resp.json().then(function (data) {

              //Gives the full details about a venue including location, tips, and categories.
                let placeInfo = data.response.venues[0];
                let info =
                    "<div id='marker'>" +
                        "<h4>" + markerInfo.marker.title + "</h4>" +
                        "<p><b>Address:</b> " + placeInfo.location.address + ", " + placeInfo.location.city + "</p>" +
                    "</div>";
                    //set the marker's info
                markerInfo.setContent(info);
            });
        })
        .catch(function (err) {
          //In case if the error is happend during loading the content the error message is displayed
             const error = "Can't load data.....";
             markerInfo.setContent(error);
         });
}
render() {
        return (<main role="main">
            <header role="banner">
            <Sidebar infoWindow = { this.state.info }
            openInfo = { this.openMarker }
            defultMarker = { this.state.defultMarkers } >
            </Sidebar>
            <h1 id = "title" role="heading"> My Favourite Locations < /h1>
             </header >
            <Map markers = { this.state.markers } > < /Map>
             </main >
        );
    }
}
export default App;
