import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';

import { setRestaurants, setRestaurant } from '../../redux/modules/restaurants';
//import { Restaurant } from '../RestaurantCard/styles';

export const MapContainer = (props) => {
  
  const dispatch = useDispatch();
  const [map, setMap] = useState(null);
  const [local, setLocal] = useState(null);
  const { google, query, placeId } = props;

  const { restaurants, restaurantSelected } = useSelector((state) => state.restaurants);
  const [restaurante, setRestaurante] = useState(null);
  
  // useEffect(()=>{
  //   if( query ){
  //     searchByQuery(query);
  //   }
  // }, [query]);

  useEffect(()=>{
    if( placeId ){
      getRestaurantById(placeId)
    }
  },[placeId])

  useEffect(()=>{
    if( placeId ){
      getRestaurantById(placeId)
    }
    console.log("daaddDDA" + restaurantSelected.geometry);
    
  },[])

  function getRestaurantById(placeId) {
    const service = new google.maps.places.PlacesService(map);
    dispatch(setRestaurant(null));
    const request = {
      placeId,
      fields:['name', 'opening_hours', 'formatted_address','formatted_phone_number','geometry'],
    }

    service.getDetails(request, (place, status)=>{
      console.log("Status>>>", status);
      
      if ( status === google.maps.places.PlacesServiceStatus.OK){
        console.log("restaurant by id>>>", place); 
        dispatch(setRestaurant(place));
        //setRestaurante(place);       
      }

    });
  }

  // function searchByQuery(query) {
  //   const service = new google.maps.places.PlacesService(map);
  //   dispatch(setRestaurants([]));
  //   const request = {
  //     placeId,
  //     location: map.center,
  //     radius: 200,
  //     type: ['restaurant'],
  //     fields:['name', 'opening_hours', 'formatted_address','formatted_phone_number','geometry'],
  //   }

  //   service.textSearch(request, (results, status)=>{
  //     console.log("Status>>>", status);
      
  //     if ( status === google.maps.places.PlacesServiceStatus.OK){
  //       console.log("restaurants sbq>>>", results); 
  //       //dispatch(setRestaurants(results));       
  //       setRestaurante(results);
  //     }

  //   });
  // }

  function onMapReady(_, map) {    
    setMap(map);    
  }

  return (
    <>
    <Map 
      style={{width:'500px', height:'200px'}}
      initialCenter={{
        lat: restaurantSelected.geometry.location.lat(),
        lng: restaurantSelected.geometry.location.lng()
      }}
      zoom={15}
      google={google}       
      onReady={onMapReady}
      onRecenter={onMapReady}       
      
      {... props}
      >
        { restaurantSelected ? (

          <Marker key={restaurantSelected.place_id} name={restaurantSelected.name} position={{
            lat: restaurantSelected.geometry.location.lat(),
            lng: restaurantSelected.geometry.location.lng(),
          }} />
        ) : (
          <div></div>
        )      
      }        
      </Map> 
      <p>ADSDSDSDSDSSDDSSS</p>       
      </>  
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  language: 'pt-BR',
})(MapContainer)