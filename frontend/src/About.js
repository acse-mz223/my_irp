import "./About.css"
import { ReactComponent as PaperIcon } from "./paper_icon.svg"
import { ReactComponent as CodeIcon } from "./code_icon.svg"
import { useRef, useEffect, useState } from "react"
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About(props){
    // main-block-background move
    const blockBgRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0, top: 0, left: 0 });

    useEffect(() => {
      if (blockBgRef.current) {
        const rect = blockBgRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left
        });
      }
    }, []); 
    
    const blockBgEventMove = (event) =>{
        const newX = (event.clientX - dimensions.left)/ dimensions.width -1
        const newY = (event.clientY - dimensions.top)/ dimensions.height -1
        gsap.to(blockBgRef.current,{
            x: newX * 300,
            y: newY * 100,
            ease: "power1.out"
        })
    }

    const blockBgEventLeave = () =>{
        gsap.to(blockBgRef.current,{
            x: 0,
            y: 0,
            ease: "power1.out"
        })
    }

    // scroll to second block
    const scrollTarget = useRef(null);
    function rollToSecondBlock(){
        scrollTarget.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    // second and third block animation
    const secondImage = useRef(null);
    const secondText = useRef(null);
    const thirdImage = useRef(null);
    const thirdText = useRef(null);

    const scrollLeft = (ref) =>{
        gsap.fromTo(ref.current,{
            xPercent: -100,
            opacity:0
        },{
            scrollTrigger:{
                trigger: ref.current,
                scrub: true,
                start: 'top bottom',
                end: 'bottom 70%'
            },
            xPercent: 0,
            opacity: 1,
            ease: "power4.out"
        })
    }

    const scrollRight = (ref) =>{
        gsap.fromTo(ref.current,{
            xPercent: 100,
            opacity:0
        },{
            scrollTrigger:{
                trigger: ref.current,
                scrub: true,
                start: 'top bottom',
                end: 'bottom 70%'
            },
            xPercent: 0,
            opacity: 1,
            ease: "power4.out"
        })
    }

    useEffect(()=>{
        // left
        scrollLeft(secondImage)
        scrollLeft(thirdText)
        scrollRight(secondText)
        scrollRight(thirdImage)
    },[])

    return (
        <div className={`subpage ${props.menuHidden && "subpage-full"}`}>
            <div className="subpage-title">About</div>
            <div className="about-box">
                <div className="main-block" onMouseMove={blockBgEventMove} onMouseLeave={blockBgEventLeave}>
                    <img ref={blockBgRef} className="main-block-background" src="./main-background.png"></img>
                    <div className="main-block-filter"></div>
                    <div className="main-block-text">
                        <p className="main-block-title">Title</p>
                        <p className="main-block-intro">
                            I particularly resonate with the company's core values of "High Goals" and "Support." While exploring your website, I noticed these values align closely with my own work ethic. I believe that a relaxed and supportive cultural atmosphere is crucial in a vibrant and evolving company. Such an environment not only allows employees to pursue the careers they love with the support of the company but also encourages them to set higher goals. By doing so, employees can enhance their professional capabilities and contribute more to the company's ongoing development.
                        </p>
                    </div>
                    <img src="./arrow_icon.png" className="main-block-arrow" onClick={rollToSecondBlock}/>
                </div>
                <div className="second-block" ref={scrollTarget}>
                    <img className="second-block-image" ref={secondImage} src="./paper-chart.png" />
                    <div className="second-block-text" ref={secondText}>
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
                    <div className="third-block-text" ref={thirdText}>
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
                    <img className="third-block-image" ref={thirdImage} src="./model-background.png" />
                </div>
            </div>
        </div>
    )
}
