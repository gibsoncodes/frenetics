import React from 'react'
import twitterLogo from "./assets/x-logo.png"
import instaLogo from "./assets/Instagram_Glyph_White.svg"

const About = () => {
  return (
    <div className='about-section'>
        <p className='about-txt roboto-light'>Frenetics was created by a solo developer and artist on about 83 cans of grapefruit Bubly. This Bubly enthusiast doesn't like about sections nearly as much as carbonation. What can one say to describe Frenetics? The thought of telling you what they are feels reductive in itself. #732 however was iterated endlessly until I felt it entirely captured what is ultimately my, not without consequences, addiction to grapefruit flavored Bubly, how it feels to crack a terminal can at a certain time of day or night when it is most delicious and have an audible yet involuntary sound of numerous origins emerge. Terminal here being the coldest a can can get without completely icing over, obsession neccessitating this lingo. This, all of this and more, feelings not conveyable through traditional routes, feelings not even known, may you discover what Frenetics is about to you.  <br></br><br></br><span className='roboto-bold-italic color-anim'>Frenetically yours,</span> </p>
        <div className='flex-col'>
            <h1 className='social-handle roboto-bold'>@FreneticsNFT</h1>
            <div className='social-row'>
                <a target="_blank" rel="noopener noreferrer" href='https://twitter.com/FreneticsNFT'><img src={twitterLogo} alt='x' className='social-link'></img></a>
                <a target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/freneticsnft/'><img src={instaLogo} alt='x' className='social-link insta'></img></a>
            </div>
        </div>
    </div>
  )
}

export default About