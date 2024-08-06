import "./About.css"
import { ReactComponent as PaperIcon } from "./paper_icon.svg"
import { ReactComponent as CodeIcon } from "./code_icon.svg"
import { useRef } from "react"

export function About(props){
    // scroll to second block
    const scrollTarget = useRef(null);
    function rollToSecondBlock(){
        scrollTarget.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }


    return (
        <div className={`subpage ${props.menuHidden && "subpage-full"}`}>
            <div className="subpage-title">About</div>
            <div className="about-box">
                <div className="main-block">
                    <div className="main-block-text">
                        <p className="main-block-title">Title</p>
                        <p className="main-block-intro">
                            I particularly resonate with the company's core values of "High Goals" and "Support." While exploring your website, I noticed these values align closely with my own work ethic. I believe that a relaxed and supportive cultural atmosphere is crucial in a vibrant and evolving company. Such an environment not only allows employees to pursue the careers they love with the support of the company but also encourages them to set higher goals. By doing so, employees can enhance their professional capabilities and contribute more to the company's ongoing development.
                        </p>
                    </div>
                    <img src="./arrow_icon.png" className="main-block-arrow" onClick={rollToSecondBlock}/>
                </div>
                <div className="second-block" ref={scrollTarget}>
                    <img className="second-block-image" src="./paper-chart.png" />
                    <div className="second-block-text">
                        <div className="main-block-title">title</div>
                        <div className="second-block-intro">
                            I particularly resonate with the company's core values of "High Goals" and "Support." While exploring your website, I noticed these values align closely with my own work ethic. I believe that a relaxed and supportive cultural atmosphere is crucial in a vibrant and evolving company. Such an environment not only allows employees to pursue the careers they love with the support of the company but also encourages them to set higher goals. By doing so, employees can enhance their professional capabilities and contribute more to the company's ongoing development.
                        </div>
                        <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4752727" target="_blank" className="about-link">
                            <PaperIcon className="about-link-icon" />
                            paper link
                        </a>
                    </div>
                </div>
                <div className="third-block">
                    <div className="third-block-text">
                        <div className="main-block-title">title</div>
                        <div className="second-block-intro">
                            I particularly resonate with the company's core values of "High Goals" and "Support." While exploring your website, I noticed these values align closely with my own work ethic. I believe that a relaxed and supportive cultural atmosphere is crucial in a vibrant and evolving company. Such an environment not only allows employees to pursue the careers they love with the support of the company but also encourages them to set higher goals. By doing so, employees can enhance their professional capabilities and contribute more to the company's ongoing development.
                        </div>
                        <a href="https://www.sciencedirect.com/science/article/abs/pii/S1750583621000104?via%3Dihub" target="_blank" className="about-link">
                            <PaperIcon className="about-link-icon" />
                            <div className="about-link-text">paper link</div>
                        </a>
                        <a href="https://github.com/co2block/CO2BLOCK" target="_blank" className="about-link">
                            <CodeIcon className="about-link-icon" />
                            <div className="about-link-text">Github</div>
                        </a>
                    </div>    
                    <img className="third-block-image" src="./model-background.png" />
                </div>
            </div>
        </div>
    )
}

// export function About(props){
//     return (
//         <div className={`subpage ${props.menuHidden && "subpage-full"}`}>
//         <div className="subpage-title">About</div>
//         <div className="about-box">
//             <div className="box">
//                 <h1>Tools</h1>
//                 <div>Introduction</div>
//             </div>
//             <div className="box">
//                 <h1>Paper</h1>
//                 <div>
//                     <img className="about-img-paper" src="./paper-background.png"/>
//                     <h3>Introduction</h3>
//                     <div>Limiting global warming to a 2°C rise may require large-scale deployment of carbon capture and storage (CCS). Due to the key role CCS plays in integrated assessment models of climate change mitigation, it is important that fundamental physical constraints are accounted for in model projections. We produce a global estimate of CO2 storage resource that accounts for pressure-limits within basin-scale reservoir systems. We use a dynamic, analytical, reduced physics model of reservoir pressurisation. We analyse storage scaleup in geological basins with injection site patterns that vary the spacing between injection sites and the number of sites per basin. We estimate a maximum pressure-limited resource base and explore scenarios where the extent of CCS deployment is limited by the history of hydrocarbon exploration within a region and the readiness of countries for deployment.The maximum pressure-limited global storage achievable after thirty years of continuous injection is 3640GtCO2 (121GtCO2yr-1), increasing to 5630GtCO2 (70GtCO2yr-1) at the end of the century. These represent an update to volumetric-based estimates that suggest in excess of 10,000Gt of storage resource available. When CCS deployment is limited to the countries ranked in the top ten by the GCCSI Storage Readiness Index, our maximum storage estimate decreases to 780GtCO2 (26GtCO2yr-1) at the mid-century and 1177GtCO2 (15GtCO2yr-1) at the end of the century. These latter results fall within the range of projected deployment by the IPCC and IEA and suggest that reservoir pressurisation will limit CCS deployment if development does not rapidly expand beyond the current implementation.</div>
//                 </div>
//                 <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4752727" target="_blank" className="about-link">
//                     <PaperIcon className="about-link-icon" />
//                     paper link
//                 </a>
//             </div>
//             <div className="box">
//                 <h1>CO2 Block</h1>
//                 <img className="about-img-model" src="./model-background.png"/>
//                 <h3>Introduction</h3>
//                 <div>Introduction</div>
                // <a href="https://www.sciencedirect.com/science/article/abs/pii/S1750583621000104?via%3Dihub" target="_blank" className="about-link">
                //     <PaperIcon className="about-link-icon" />
                //     paper link
                // </a>
                // <a href="https://github.com/co2block/CO2BLOCK" target="_blank" className="about-link">
                //     <CodeIcon className="about-link-icon" />
                //     Github
                // </a>
//             </div>                        
//         </div>
//     </div>
//     )
// }