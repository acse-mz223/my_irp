import "./header.css"

export function Header(){
    return(
        <div>
        <header className="header">
          <div className='header-icon'>Mo</div>
          <div className='header-title'>CO2 Block  Preload Analysis System </div>
          <button className='header-signin-button'>Sign in</button>
        </header>
      </div>
    )
}