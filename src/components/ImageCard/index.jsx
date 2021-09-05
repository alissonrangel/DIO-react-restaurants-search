import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Skeleton from '../Skeleton';

const Card = styled.div`
  width: 90px;
  height: 90px;
  justify-content: center;
  padding: 5px;
  border-radius: 6px;
  background-image: url(${(props) => props.photo});
  background-size: cover;
  //background-color: green;
`

const Title = styled.span`
  font-family: ${(props)=> props.theme.fonts.regular};
  color: #fff;
  //display: inline-block;
  //margin-top: 16px;
  font-size: 16px;
`;

const ImageCard = ({ photo, title }) => {  
  
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = photo;
    imageLoader.onload = () => {
      setImageLoaded(true);
    }
  },[photo]);
  
  return (
    <>
    { imageLoaded ? (
        <Card photo={photo} >
          <Title>{title}</Title>
        </Card>  
      ) : (
        <Skeleton width="90px" height="90px"/>
      )
    }
              
    </>
  );
}

export default ImageCard;