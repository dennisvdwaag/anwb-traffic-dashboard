import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import decodePolyline from 'decode-google-map-polyline';
import { Map, GoogleApiWrapper, Polyline } from 'google-maps-react';

const Maps = ({ google }) => {
  let polylines = [];

  const roads = useSelector(state => state.roads);
  const mapStyle = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];

  const _mapLoaded = (mapProps, map) => {
    map.setOptions({
      styles: mapStyle
    });
  };
  
  const [bounds, setBounds] = useState(new google.maps.LatLngBounds());
  const newBounds = useSelector(state => state.bounds);

  useEffect(() => {
    if (newBounds !== null) {
      setBounds(new google.maps.LatLngBounds(new google.maps.LatLng(newBounds.southWest), new google.maps.LatLng(newBounds.northEast)));
    } else {
      setBounds(new google.maps.LatLngBounds(new google.maps.LatLng({ lat: 50.803721015, lng: 3.31497114423 }), new google.maps.LatLng({ lat: 53.5104033474, lng: 7.09205325687 })));
      setPolylinesBounds();
    }
  }, [newBounds]);
  
  const setPolylinesBounds = () => {
    if (undefined !== roads) {
      roads.forEach(road => {
        const incidents = road.incidents;
    
        if (incidents.length) {
          incidents.forEach(incident => {
            if (incident.polyline !== null) {
              const polyline = decodePolyline(incident.polyline);
              polylines.push({
                type: incident.type,
                line: polyline
              });
            }
  
            if (incident.bounds.lat && incident.bounds.lng && newBounds === null) {
              bounds.extend(incident.bounds);
            }
          });
        }
      });
    }
  }

  setPolylinesBounds();

  return (
    <Map 
      google={ google } 
      bounds={ bounds }
      zoom={ 8 }
      initialCenter={
        {
          lat: 52.1326,
          lng: 5.2913
        }
      }
      onReady={(mapProps, map) => {
        _mapLoaded(mapProps, map);
      }}
    >
      {
        polylines.map((polyline, key) => {
          return <Polyline path={ polyline.line } strokeColor={ polyline.type === 'roadwork' ? '#F79F1F' : '#EA2027' } strokeWeight={ 3 } key={ key } />
        })
      }
    </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA3QGxol-EFFIQZgZnu0zTJPVkgxvnFJhU' //'AIzaSyDYhmmgZPV4hmWE81saE92UbbLAWkhBsC0'
})(Maps)