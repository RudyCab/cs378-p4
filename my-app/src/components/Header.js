import React, {useState, useEffect} from 'react';
import Api from './Api';


const Header = ({city1, city2, city3}) => {
    const [imageSrc, setImageSrc] = useState(`${process.env.PUBLIC_URL}/images/austin.jpg`);

    const handleButtonClick = (image, city) => {
        setImageSrc(`${process.env.PUBLIC_URL}/${image}`);
        <Api city="city"/>

    };

    return (
        <div className="container" style={{ backgroundImage: `url(${imageSrc})` }}>
            <img class="logo" src={`${process.env.PUBLIC_URL}/logo.png`} alt='menu logo'/>
            <div className="buttons-container">
                <button class="city1" onClick={()=> { handleButtonClick('images/austin.jpg', 'austin')}}type="button">{city1}</button>
                <button class="city2" onClick={()=> { handleButtonClick('images/dallas.jpg', 'dallas')}}type="button">{city2}</button>
                <button class="city3" onClick={()=> { handleButtonClick('images/houston.jpg', 'houston')}}type="button">{city3}</button>
            </div>
            <div>
            </div>

            <div className='search-container'>
            <form>
                <input type="city" name="City"required></input>
                <button type="submit">Submit</button>
            </form>
            </div>
        </div>
    );
};

export default Header;