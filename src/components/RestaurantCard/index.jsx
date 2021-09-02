import React, { useState } from 'react';
import { Restaurant, RestaurantInfo, Title, Address, RestaurantPhoto } from './styles';
import ReactStars from "react-rating-stars-component";
import restaurante from '../../assets/restaurante-fake.png';

const RestaurantCard = ({restaurant, onClick}) => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <Restaurant onClick={onClick}>
      <RestaurantInfo>
        <Title>{restaurant.name}</Title>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          isHalf
          value={restaurant.rating}
          edit={false}
          activeColor="#e7711c"
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}          
        />
        <Address>{restaurant.vicinity || restaurant.formatted_address}</Address>
      </RestaurantInfo>
      <RestaurantPhoto src={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante} alt="Foto do restaurante"/>
    </Restaurant>
  );
}

export default RestaurantCard;