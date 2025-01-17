import React, { useRef, useEffect } from 'react';
import learnImg from '../assets/practical-UI.webp';
import Footer from './Footer';
import learn1 from '../assets/learn1.webp';
import learn2 from '../assets/learn2.webp';
import learn3 from '../assets/learn3.webp';
import learn4 from '../assets/learn4.webp';
import learn5 from '../assets/learn5.webp';
import learn6 from '../assets/learn6.webp';
import gsap from 'gsap';

const Learn = ({ title }) => {
  const fromRight = useRef(null);
  const fromLeft = useRef(null);


  useEffect(() => {
    gsap.fromTo(
      fromRight.current,
      {
        x: 600
      },
      {
        x: 0,
        duration: 1,
        delay: 1
      }
    );
  }, []);
  useEffect(() => {

    gsap.fromTo(
      fromLeft.current,
      {
        x: -600,
      },
      {
        x: 0,
        duration: 1,
        delay: 1
      }
    )


  }, [])



  return (
    <>
      <div className="learn-box pt-10 pb-20 mb-7 flex justify-center items-center flex-col sm:flex-row">
        <div ref={fromLeft} className="box1 w-full sm:w-[50%] p-10">
          <div className="heading">
            <h5 className="text-gray-600">UI design</h5>
            <h5 className="text-6xl font-bold">Learn.</h5>
          </div>
          <div className="para1 mt-5 text-gray-600 text-xl">
            A few ways I can help you learn and master UI design.
          </div>
          <div className="para1 mt-5 text-gray-800 text-xl">
            With over 2 decades of experience as a product designer specialising
            in UI design and design systems, I’m excited to share what I've
            learned.
          </div>
        </div>
        <div className="box2 w-full sm:w-[50%]">
          <img ref={fromRight} src={learnImg} alt="UI Design" />
        </div>
      </div>

      <Footer img1={learn1} img2={learn2} img3={learn3} />
      <Footer img1={learn4} img2={learn5} img3={learn6} />
    </>
  );
};

export default Learn;

