import React, { useState } from 'react';
import { Restaurant, RestaurantInfo, Title, Address, RestaurantPhoto } from './styles';
import ReactStars from "react-rating-stars-component";
import restaurant from '../../assets/restaurante-fake.png';

const RestaurantCard = () => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <Restaurant>
      <RestaurantInfo>
        <Title>Nome do restaurante</Title>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          isHalf
          value={4.5}
          edit={false}
          activeColor="#e7711c"
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}          
        />
        <Address>Rua 24 de janeiro, 1023</Address>
      </RestaurantInfo>
      <RestaurantPhoto src={restaurant} alt="Foto do restaurante"/>
    </Restaurant>
  );
}

export default RestaurantCard;