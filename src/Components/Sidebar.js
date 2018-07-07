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
        ///Search Function
    search= (event) =>{
        const targetMarker = event.target.value.toLowerCase();
        const markers = this.props.defultMarker;
        //Depending on the search result
        const newMarkers = [];
        markers.forEach(function(marker) {
            ///loop for the markers set the new result and push target search
            if (marker.title.toLowerCase().indexOf(targetMarker.toLowerCase()) >= 0) {
              marker.setVisible(true);
                newMarkers.push(marker);
            }
            else {
              marker.setVisible(false);
          }
        });
        //Set the value of marker to the new search result
        this.setState({ markers: newMarkers });
    }
///////searchBar open function //////////
    open = () => {
        const searchBar = document.querySelector('.sideBar');
        if (searchBar.style.display === 'none')
        searchBar.style.display = 'block';
        else
        searchBar.style.display = 'none';
    }
    render() {
           return (
               <div>
                   <div  className="searchBarIcon" onClick={this.open} tabIndex="0" >
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
                                    tabIndex="0" role="link">{marker.title}</a>
                               </li>
                           )}
                       </ul>
                   </div>
               </div>
           );
       }
   }
export default Search;
