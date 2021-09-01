import React, { useState } from 'react';
import TextField, {HelperText, Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import Slider from "react-slick";
import logo from '../../assets/logo.svg';
import restaurante from '../../assets/restaurante-fake.png';
import { Card, RestaurantCard, Modal, Map } from '../../components';
import { Container, Carousel, Search, Logo, Wrapper, CarouselTitle } from './styles'
import {useDispatch, useSelector} from 'react-redux';
import { Restaurant } from '../../components/RestaurantCard/styles';

const images = [
  { src: restaurante },
  { src: restaurante },
  { src: restaurante },
  { src: restaurante },
];

const Home = () => {
  
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const { restaurants } = useSelector((state) => state.restaurants);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    adaptiveHeight: true
  };

  function handleKeyPress(e) {
    if( e.key === 'Enter' ){
      setQuery(inputValue);
    }
  }

  return (
    <Wrapper>
      <Container style={{color: 'black'}}>
        <Search >
          <Logo src={logo} alt="Logo do restaurante"/>
          <TextField
              style={{width: '300px'}}
              label='Pesquisar Restaurantes'
              outlined          
              trailingIcon={<MaterialIcon role="button" icon="search"/>}
            >
            <Input
            value={inputValue}
            onKeyPress={handleKeyPress}
            onChange={(e) => setInputValue(e.target.value)} />
          </TextField>
          <CarouselTitle>Na sua Área</CarouselTitle>          
          <Carousel {...settings}>
            <Card photo={restaurante} title="Nome do restaurante" />
            <Card photo={restaurante} title="Nome do restaurante" />
            <Card photo={restaurante} title="Nome do restaurante" />
            <Card photo={restaurante} title="Nome do restaurante" />
          { restaurants.map((restaurant)=>(
            <Card
              key={restaurant.place_id}
              photo={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante}
              title={restaurant.name}
            />
          ))}
          </Carousel> 
          <button onClick={() => setModalOpened(true)}>Abrir modal</button>                   
        </Search>
        { restaurants.map((restaurant)=>(
          <RestaurantCard restaurant={restaurant}/>
        ))}
        
      </Container>
      <Map query={query}>
        {/* <Slider {...settings}>
          {images.map((img) => (
            <div>
              <img src={img.src} />
            </div>
          ))}
        </Slider> */}
      </Map>
      <Modal open={modalOpened} onClose={() => setModalOpened(!modalOpened)} />
    </Wrapper>
  );
};
export default Home;