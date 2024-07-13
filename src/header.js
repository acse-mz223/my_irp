import "./header.css"

export function Header(){
    return(
        <div>
        <header className="header">
          <img className='header-icon' src="./logo.jpg" />
          <div className='header-title'>CO2 Block  Preload Analysis System </div>
          <button className='header-signin-button'>Sign in</button>
        </header>
      </div>
    )
}