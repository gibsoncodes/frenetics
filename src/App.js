// video imports
import React from 'react';



import logo from './logo.svg';
import './App.css';
import banner from "./assets/frenetics_logo_white.png"
import { useState, useEffect } from 'react';
import openseaLogo from "./assets/opensea.png"
import HeaderAnim from './components/HeaderAnim';
import About from './About';
import Lab from './Lab';


const nftFiles = [];
for (let i = 1; i <= 100; i++) {
nftFiles.push(require(`./assets/nfts/${i}.mp4`));
}
function App() {
    const [page, setPage] = useState("main");


  return (
    <div className="App">
      <div className='header'>
        <img onClick={() => setPage("main")} src={banner} alt='banner' className='header-img'></img>
        <div className='header-animation'>
            <HeaderAnim />
        </div>
      </div>

      {page === "main" &&
      
      <React.Fragment>

        <h1 className='banner-txt roboto-thin'><span className='roboto-bold-italic color-anim'>NFT's</span> for the imaginative <br></br> Embrace a striking and inimitable art collection <span onClick={() => setPage("about")} className='about-us'>about us</span> </h1>

        <div className='btn-row'>
            <a target="_blank" rel="noopener noreferrer" href='https://app.niftykit.com/collections/frenetics'><p className='purchase-info roboto-regular'>M I N T</p></a>
            <p onClick={() => setPage("lab")} id="lab-btn" className='purchase-info roboto-regular'>L A B</p>
        </div>
        <div className='main-nfts'>
            {nftFiles.map((file, index) => {
                return (
                    <div key={`${index}nft`} className='nft-div'>
                        <video autoPlay muted loop playsInline className='nft-mov'>
                            <source src={file} type="video/mp4" />
                        </video>
                        <div className='flex-row'>
                            <h1 className='nft-num roboto-light'>#{index + 1}</h1>
                            <a target="_blank" rel="noopener noreferrer" href='https://opensea.io/collection/frenetics'>
                            <img src={openseaLogo} alt='opensea-link' className='opensea-link'></img>
                            </a>
                        </div>
                    </div>
                )
            })}
        </div>
      </React.Fragment>
      }

      {page === "about" &&
        <About />
      }

      {page === "lab" &&
        <Lab />
      }

    </div>


  );
}

export default App;
