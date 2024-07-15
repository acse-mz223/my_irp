
import React from "react";
import {Outlet} from "react-router-dom"
import './MainPage.css';
import { Header } from './header';
import { Nav } from './nav';

export function MainPage(props) {

  
  return (
    <div>
      <Header setMenuHidden={props.setMenuHidden}/>
      <div className='main-body'>
          {props.menuHidden || <Nav />}
          <Outlet/>
      </div>
    </div>
  );
}


