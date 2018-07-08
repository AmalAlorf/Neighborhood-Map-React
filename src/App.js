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
            loadingError:'',
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
            //declare the status of Google map loading

        };
//Using this binding to make `this` work in the callback
          this.initializationMap = this.initializationMap.bind(this);
          this.createMarkers = this.createMarkers.bind(this);
         this.openMarker = this.openMarker.bind(this);
         this.createMarkers=this.createMarkers.bind(this);
         this.updateLoadingError=this.updateLoadingError.bind(this);
         this.googleLoading=this.googleLoading.bind(this);
      //   this.
    }
////////function to Create the map by calling google api///////////
componentDidMount() {
  //gm_authFaliure function should be able to catch the errors
  window.gm_authFailure = function() {
   alert('Google maps failed to load!');
}
window.initializationMap = this.initializationMap;
const googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyC36rhwahGvbFMy01utzj0aVDCcZ6SbB9c&libraries=places&callback=initializationMap';
this.googleLoading(googleMapURL);
}
//////////check if there is any error in google map loading using fetch and catch///////////
googleLoading(googleMapURL)
{
let createMarkers = this.createMarkers;
let errorLoading=this.updateLoadingError;
  fetch(googleMapURL)
      .then(function (resp) {
          if (resp.status !== 200) {
            this.setState({
                      loadingError: true
            });
          }
          this.setState({
                    loadingError: false
                  });
          resp.json().then(function (data) {
            let script = document.createElement('script');
             script.type = 'text/javascript';
             script.src = googleMapURL;
             script.async = true;
             document.body.appendChild(script);
          });

      })
        // handle the google map loading error
      .catch(function (err) {
        let mapContainerElemt = document.getElementById('map');
              mapContainerElemt.innerHTML = '<div class="alert alert-danger" align="center">Error !!<br>Google Map can not be loaded! </div>'
                errorLoading();
                  // create the list of markes even if there is error in google map
               createMarkers(null);
      });
}
/////////////Set the loading map error to true////////////////////
updateLoadingError()
{
    this.setState({ loadingError:true});
}
/////////////initializationMap function////////////////////////////
 initializationMap() {
  if(this.state.loadingError===false)
   {        let map;
            map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: { lat: 24.711925, lng: 46.715417 }
            });
            // InfoWindow attach the information of to marker
            var infowindow = new window.google.maps.InfoWindow({});
            this.setState({ map: map, info: infowindow });
            this.createMarkers(map);
          }
          else {
              this.createMarkers(this.prop);
          }
        }
        ///////////////////////////
        //to add the markers
    createMarkers(map) {
      let mark ;
      let Markers;
      let markerFunction = this;

    if(this.state.loadingError===false)
      {
            this.state.markers.forEach(marker => {
                const loc = { lat: marker.lat, lng: marker.long }
                 let mark = new window.google.maps.Marker({
                    position: loc,
                    map: map,
                    title: marker.name
                });
                mark.addListener('click', function() {
                  //      let markerFunction = this;
                //    if(this.props && this.props.google)
                    markerFunction.openMarker(mark);
     });
                //push to search about marker
                  let Markers = this.state.defultMarkers;
               Markers.push(mark);
                 this.setState({ defultMarkers: Markers });

            });
          }
          //In case if ther is errpr to load the google maps
          else {
              this.state.markers.forEach(marker => {
                  const loc = { lat: marker.lat, lng: marker.long }
                   mark = {
                      position: loc,
                      map: null,
                      title: marker.name
                  };
                  Markers = this.state.defultMarkers;
                 Markers.push(mark);
                 this.setState({ defultMarkers: Markers });
                })
                };
        }
        ////////////////openMarker Function////////////////////////////
    openMarker(marker) {
      if(this.state.loadingError===false)
       {
    //Define the client ID and clien secret to use four sequare API
            const clientId = "YLCL43LDII4P4TXTBAP2DV53V122ZWXSXCKB0S1JFC00DVXN\n";
            const clientSecret = "K2RL2RBQ15ZJOBINTMBWLQ2BKPAM2ZV4BU0S0HZZTH3MHTAJ\n";
            // if(this.props && this.props.google)

            const url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";

                    if (this.state.info.marker !== marker) {
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
        }
         else
         {
           alert('Google maps failed to load!');
        }
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
