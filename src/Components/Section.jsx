import React, { useRef, useEffect } from 'react';
import section from '../assets/section.jpg';
import Footer from './Footer';
import footer1 from '../assets/footer1.jpg';
import footer2 from '../assets/footer2.jpg';
import footer3 from '../assets/footer3.jpg';
import gsap from 'gsap';
import './section.css'

function Section() {
  
  const sectionRef = useRef(null);

  useEffect(() => {
    
    gsap.to(sectionRef.current, {
      opacity: 1,   
      duration: 1,  
      delay: 1,    
    });
  }, []);


  return (
    <>
      <section ref={sectionRef} className="h-[85vh] w-full z-10 opacity-0">
        <div className="img relative ">
          <img className="h-[85vh]  w-full" src={section} alt="For some error image not show" id='imgBox'/>
          <div className="info-div bg absolute top-0 flex justify-center items-center h-[85vh] w-full indent-3">
            <div className="designer w-[50%] h-full flex justify-start items-center flex-col ">
              <div className="design w-[90%] mt-36">
                <h1 className="text-6xl font-bold text-gray-600" id='heading'>designer</h1>
                <p className=" w-[65%] mt-2 text-center text-sm pr-10 text-gray-600 " id='text'>
                  Product designer specialising UI design and design system.
                </p>
              </div>
            </div>

            <div className="coder w-[50%] h-full flex justify-start items-center flex-col">
              <div className="coder-info mt-36 flex justify-center items-end flex-col w-[90%] ">
                <h1 className="text-7xl text-gray-700 font-bold pr-5" id='heading'> &lt;coder&gt;</h1>
                <p className="text-sm w-[65%] flex justify-start items-center text-center text-gray-600" id='text'>
                  Front end developer who writes clean, elegant and efficient code
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer  workLatest={'some of my latest work'} img1={footer1} img2={footer2} img3={footer3} />
    </>
  );
}

export default Section;
