
import {Outlet} from "react-router-dom"
import './MainPage.css';
import { Header } from './header';
import { Nav } from './nav';

export function MainPage() {
  return (
    <div>
      <Header />
      <div className='main-body'>
          <Nav />
          <Outlet/>
      </div>
    </div>
  );
}


