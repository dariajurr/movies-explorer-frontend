import React from 'react';
import './NavPopup.css';
import { PopUpContext } from '../../contexts/PopUpContext';
import NavAuth from '../NavAuth/NavAuth';

function NavPopup({isOpen}) {
    const { closePopup } = React.useContext(PopUpContext);
    
    return (
        <div className={`navPopup ${isOpen&&'navPopup_active'}`}>
            <button className='navPopup_btn' onClick={closePopup}>&#215;</button>
            <NavAuth mainPage={true}/> 
        </div>
    );
}
export default NavPopup;