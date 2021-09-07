import React, { useState } from 'react';
import TextField, {HelperText, Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import Slider from "react-slick";
import logo from '../../assets/logo.svg';
import restaurante from '../../assets/restaurante-fake.png';
import { Card, RestaurantCard, Modal, Map, Loader, Skeleton, MiniMap } from '../../components';
import { Container, Carousel, Search, Logo, Wrapper, CarouselTitle, ModalTitle, ModalContent, ModalPhoto } from './styles'
import {useDispatch, useSelector} from 'react-redux';


const images = [
  { src: restaurante },
  { src: restaurante },
  { src: restaurante },
  { src: restaurante },
];

const Home = () => {
  
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState(null);
  const [placeId, setPlaceId] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const { restaurants, restaurantSelected } = useSelector((state) => state.restaurants);

  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
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

  function handleOpenModal(placeId) {
    setPlaceId(placeId);
    setModalOpened(true);
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
          { restaurants.length > 0 ? (
            <>
              <CarouselTitle>Na sua Área</CarouselTitle>          
              <Carousel {...settings}>                
                { restaurants.map((restaurant)=>(
                  <Card
                    key={restaurant.place_id}
                    photo={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante}
                    title={restaurant.name}
                  />
                ))}
              </Carousel> 
            </>
          ) : (
            <>            
              <Loader />
            </>
          )}                    
        </Search>
        { restaurants.map((restaurant)=>(
          <RestaurantCard
            key={restaurant.place_id} 
            restaurant={restaurant}
            onClick={()=> handleOpenModal(restaurant.place_id)}
          />
        ))}
        
      </Container>
      <Map query={query} placeId={placeId}>        
      </Map>
      <Modal open={modalOpened} onClose={() => setModalOpened(!modalOpened)} >        
        { restaurantSelected ? (
          <div style={{ height:'350px', overflow:'hidden' }}>
            <div style={{ display:'block', position:'relative', top:'10px' }}>
              <MiniMap placeId={restaurantSelected.placeId}/>
            </div>          
            <div style={{ zIndex:'100', display:'block', position:'relative', top:'220px' }}>
              <ModalTitle>{restaurantSelected ? restaurantSelected.name : "Sem nome"}</ModalTitle>        
              <ModalContent>{restaurantSelected ? restaurantSelected.formatted_phone_number : "(86) 3333-3334"}</ModalContent>
              <ModalContent>{restaurantSelected ? restaurantSelected.formatted_address : "Rua 12"}</ModalContent>
              <ModalContent>{restaurantSelected ? (restaurantSelected.opening_hours ? (restaurantSelected.opening_hours.open_now ? "Aberto agora :)" : "Fechado neste momento"): "Fechado neste momento" ) : "Fechado neste momento"}</ModalContent>
            </div>          
          </div>
        ) : (
          <>
            <Skeleton width="10px" height="10px"/>
            <Skeleton width="10px" height="10px"/>
            <Skeleton width="10px" height="10px"/>
            <Skeleton width="10px" height="10px"/>
          </>
        )}
      </Modal>
    </Wrapper>
  );
};
export default Home;