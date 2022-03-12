import React from "react";
import './CarrouselItem.css';
import profile from '../../../assets/profile_img.png';
import movie from '../../../assets/movie_img.png';
import { Link } from "react-router-dom";
const CarrouselItem = (props) => {
  const item = props.item;
  let path = '';
  if(item.poster_path || item.profile_path){
    path=props.imagePath;
  }else{
    if(!props.cover){
      path = profile
    }else{
      path= movie;
    }
  }
  return (
    <React.Fragment>
      {props.cover && 
      <Link to={`/movie/${item.id}`} state={{images:props.conf}}>
        <div className="info-movie" >
          <h1>{item.title}</h1>
          <p>Vote average: {item.vote_average}</p>                        
        </div>      
      </Link>
      }
      <img className={props.className} src={path } alt={props.item.name} />        
      {props.item.name && <p>{props.item.name}</p>}

    </React.Fragment>
  )
};

export default CarrouselItem;