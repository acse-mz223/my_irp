import "./nav.css"
import { ReactComponent as EarthIcon } from './earth_icon.svg';
import { ReactComponent as ImageIcon } from './image_icon.svg';
import { ReactComponent as PinIcon } from './pin_alt_icon.svg';

export function Nav(){
    return(
        <div className="nav-box">
            <div className="nav-div">
                <div className="nav-div-title">Raw Data</div>
                <div className="nav-div-figure">
                    <EarthIcon className="nav-div-icon" />
                    Data
                    </div>
                <div className="nav-div-figure">
                    <PinIcon className="nav-div-icon" />
                    Data distribution map
                    </div>
            </div>
            <div className="nav-div">
                <div className="nav-div-title">Data Analysis - basin</div>
                <div className="nav-div-figure">
                    <ImageIcon className="nav-div-icon" />
                    Figure 3
                </div>
                <div className="nav-div-figure">
                    <ImageIcon className="nav-div-icon" />
                    Figure 5
                </div>
            </div>
            <div className="nav-div nav-div-last">
                <div className="nav-div-title">Data Analysis - World</div>
                <div className="nav-div-figure">
                    <ImageIcon className="nav-div-icon" />
                    Figure 6
                </div>
                <div className="nav-div-figure">
                    <ImageIcon className="nav-div-icon" />
                    Figure 7
                </div>
                <div className="nav-div-figure">
                    <ImageIcon className="nav-div-icon" />
                    Figure 8
                </div>
                <div className="nav-div-figure">
                    <ImageIcon className="nav-div-icon" />
                    Figure 9
                </div>
            </div>


        </div>
    )
}