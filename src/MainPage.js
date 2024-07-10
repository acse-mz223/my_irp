
import {Outlet} from "react-router-dom"
import './MainPage.css';
import { Header } from './header';
import { Nav } from './nav';

export function MainPage() {
  return (
    <div>
      <Header />
      <div className='body'>
          <Nav />
          <div>XXX</div>
          <Outlet />
      </div>
    </div>
  );
}


