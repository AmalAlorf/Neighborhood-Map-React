import React, { Component } from 'react';
//Search class react Component
class Search extends Component {

    state = {
        markers: []
    };

    /////////////////////////Initialization for the requires DOM /////////
    componentDidMount() {
            ////////Set marker values
            this.setState({ markers: this.props.defultMarker });
        }
        ///////////////////////////////////////////////
        ///Search Function
    search= (event) =>{
        const query = event.target.value.toLowerCase();
        const markers = this.props.defultMarker;
        //Depend on the search result
        const newMarkers = [];
        markers.forEach(function(marker) {
            ///loop for the markers set the new result and get target search
            if (marker.title.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
            //check for the first letter
          //  if (marker.title.toLowerCase() === event.target.value.toLowerCase()) {
                // if the lettesr are match then push the new markers to the new list
                newMarkers.push(marker);
            }
        });
        //Set the value of marker to the new search result
        this.setState({ markers: newMarkers });
    }
/////////////////
    open = () => {
        const searchBar = document.querySelector('.sideBar');
        if (searchBar.style.display === 'none')
        searchBar.style.display = 'block';
        else
        searchBar.style.display = 'none';
    }
    // add the icon instead of lines

    render() {
           return (
               <div>
                   <div className="searchBarIcon" onClick={this.open}>
                   </div>
                   <div className="sideBar">
                       <div className="form" role="form">
                           <input type="text"
                                 placeholder="Search"
                                  className="input" role="search"
                                  onChange={this.search}/>
                       </div>
                       <ul role="list">
                           { this.state.markers.map((marker, i) =>
                               <li key={i}>
                                   <a href="#" onClick={this.props.openInfo.bind(this, marker)}
                                    role="link">{marker.title}</a>
                               </li>
                           )}
                       </ul>
                   </div>
               </div>
           );
       }
   }
export default Search;
