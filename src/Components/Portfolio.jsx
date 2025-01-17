// these are Portfolio imges i name them blog1 but now i publish this code on github 
import React, { useRef, useEffect } from 'react';
import blogImg from '../assets/blogImg.jpg';


import blog1 from '../assets/blog1.jpg';
import blog2 from '../assets/blog2.jpg';
import blog3 from '../assets/blog3.jpg';
import blog4 from '../assets/blog4.jpg';
import blog5 from '../assets/blog5.jpg';
import blog6 from '../assets/blog6.jpg';
import blog7 from '../assets/blog7.jpg';
import blog8 from '../assets/blog8.jpg';
import blog9 from '../assets/blog9.jpg';
import blog10 from '../assets/blog10.jpg';
import blog11 from '../assets/blog11.jpg';
import blog12 from '../assets/blog12.jpg';
import blog13 from '../assets/blog13.jpg';
import blog14 from '../assets/blog14.jpg';
import blog15 from '../assets/blog15.jpg';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Portfolio() {
    const fromLeft = useRef(null)
    const fromRight = useRef(null)

    const images = [
        blog1, blog2, blog3, blog4, blog5,
        blog6, blog7, blog8, blog9, blog10,
        blog11, blog12, blog13, blog14, blog15,
    ];


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

    useEffect(() => {
      gsap.fromTo(
        fromRight.current,
        {
            x:600
        },
        {
            x:0,
            duration:1,
            delay:1
        }

      )

    
    }, [])
    


    return (
        <>
            <div className="learn-box pt-10 pb-20 mb-7 flex justify-center items-center flex-col sm:flex-row">
                <div ref={fromLeft} className="box1 w-full sm:w-[50%] p-10">
                    <div className="heading">
                        <h5 className="text-6xl font-bold">portfolio.</h5>
                    </div>
                    <div className="para1 mt-5 text-gray-600 text-xl">
                        Check out some of my latest product design case studies.
                    </div>
                    <div className="para1 mt-5 text-gray-800 text-xl">
                        I’ve worked for startups, agencies, corporations, and government
                        and have led projects to design products used by millions of
                        people.
                    </div>
                </div>
                <div className="box2 w-full sm:w-[50%]">
                    <img ref={fromRight} src={blogImg} alt="Portfolio Overview" />
                </div>
            </div>

            <div className="portfolio-main-box bg-slate-100 p-10 border border-gray-300">
                <p className="text-center underline text-gray-700 text-lg">
                    My Portfolio
                </p>
                <div  className="container mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="work-item rounded-lg bg-slate-200 border border-zinc-100"
                        >
                            <div className="container-img p-3">
                                <div className="img cursor-pointer">
                                    <img
                                        className="w-full h-auto rounded-xl"
                                        src={image}
                                        alt={`Portfolio item ${index + 1}`}
                                    />
                                </div>
                                <div className="heading-main mt-4 text-gray-700">Heading One</div>
                                <div className="sub-heading text-gray-700">Sub-heading</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Portfolio;
