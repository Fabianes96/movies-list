const apiConfig ={
  API_KEY: process.env.REACT_APP_MOVIES_API_KEY,
  URL: process.env.REACT_APP_MOVIES_URL,
}

export const getPopularMovies = async()=>{
  try {
    const res = await fetch(apiConfig.URL + '/popular?api_key=' + apiConfig.API_KEY);
    if(!res.ok){
      throw new Error('Something went wrong');
    }
    const resJson = await res.json();
    return resJson    
  } catch (error) {
    return error;
  }
}
export const getRecentMovies = async(page=1)=>{
  try {
    const res = await fetch(apiConfig.URL + '/now_playing?api_key=' + apiConfig.API_KEY +"&page="+page);
    if(!res.ok){
      throw new Error('Something went wrong');
    }
    const resJson = await res.json();
    return resJson    
  } catch (error) {
    return error;
  }
}
export const getMovieDetails = async(id)=>{
  try {
    const res = await fetch(`${apiConfig.URL}/${id}?api_key=${apiConfig.API_KEY}`);
    if(!res.ok){
      throw new Error('Something went wrong');
    }
    const resJson = await res.json();
    return resJson    
  } catch (error) {
    return error;
  }
}
export const getMovieCredits = async(id)=>{
  try {
    const res = await fetch(`${apiConfig.URL}/${id}/credits?api_key=${apiConfig.API_KEY}`);
    if(!res.ok){
      throw new Error('Something went wrong');
    }
    const resJson = await res.json();
    return resJson    
  } catch (error) {
    return error;
  }
}

export const getConfiguration = async()=>{
  try {
    const res = await fetch(`${apiConfig.URL.replace('/movie','')}/configuration?api_key=${apiConfig.API_KEY}`);
    if(!res.ok){
      throw new Error('Something went wrong');
    }
    const resJson = await res.json();
    return resJson   
  } catch (error) {
    return error;
  }
}

export const searchMovie= async(query,page=1)=>{
  try {
    const res = await fetch(`${apiConfig.URL.replace('/movie','/search')}/movie?api_key=${apiConfig.API_KEY}&query=${query}&page=${page}`);
    if(!res.ok){
      throw new Error('Something went wrong');
    }
    const resJson = await res.json();
    return resJson   
  } catch (error) {
    return error;
  }
}

export const getCast = async(id)=>{
  try {
    const res = await fetch(`${apiConfig.URL}/${id}/credits?api_key=${apiConfig.API_KEY}`);
    if(!res.ok){
      throw new Error('Something went wrong');
    }
    const resJson = await res.json();
    return resJson   
  } catch (error) {
    return error;
  }
}