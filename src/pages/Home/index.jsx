import React, { useState } from 'react';
import TextField, {HelperText, Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import Slider from "react-slick";
import logo from '../../assets/logo.svg';
import restaurante from '../../assets/restaurante-fake.png';
import { Card } from '../../components';
import { Container, Carousel, Search, Logo, Wrapper, Map, CarouselTitle } from './styles'

const images = [
  { src: restaurante },
  { src: restaurante },
  { src: restaurante },
  { src: restaurante },
];

const Home = () => {
  
const [inputValue, setInputValue] = useState('cachorro')

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  adaptiveHeight: true
};



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
            onChange={(e) => setInputValue(e.target.value)} />
          </TextField>
          <CarouselTitle>Na sua Área</CarouselTitle>          
          <Carousel {...settings}>
            <Card photo={restaurante} title="Nome sei lá" />
            <Card photo={restaurante} title="Nome sei lá"/>
            <Card photo={restaurante} title="Nome sei lá"/>
            <Card photo={restaurante} title="Nome sei lá"/>
            <Card photo={restaurante} title="Nome sei lá"/>
            <Card photo={restaurante} title="Nome sei lá"/>
          </Carousel>                    
        </Search>
      </Container>
      <Map>
        {/* <Slider {...settings}>
          {images.map((img) => (
            <div>
              <img src={img.src} />
            </div>
          ))}
        </Slider> */}
      </Map>
    </Wrapper>
  );
};
export default Home;