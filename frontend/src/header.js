import "./header.css"
import { ReactComponent as MeunIcon } from './menu_icon.svg';
import gsap from 'gsap';

export function Header(props){
    return(
        <header className="header">
          <div className='header-icon-div'>
            <MeunIcon className='header-menu' onClick={
              () =>{
                // change state
                props.setMenuHidden((preValue) =>{
                  return !preValue
                })
              }
            }/>
            <img className='header-icon' src="./logo.jpg" />
          </div>
          <div className='header-title'>CO2 Block  Preload Analysis System </div>
          <button className='header-signin-button'>Sign in</button>
        </header>

    )
}