import React from 'react';
import blogImg from '../assets/blogImg-1.webp';
import blogImg2 from '../assets/blogImg-2.webp';
import blogImg3 from '../assets/blogImg-3.jpg';
import blogImg4 from '../assets/blogImg-4.jpg';
import man from '../assets/profile_photo.jpg';

function Blog() {
    return (
        <>
            <div className="blog-main-box flex justify-center items-center pt-16 flex-col">
                {/* Blog Card */}
                <div className="card w-[67%]  p-3 m-10 max-sm:w-[90%]">

                    <div className="img">
                        <img className="rounded-xl" src={blogImg} alt="Blog" />
                    </div>
                    <div className="heading text-2xl font-bold mt-4 sm:text-5xl">How to build a design system</div>
                    <div className="text1 text-xl mt-4 w-[90%]">A step by step guide to build a design system with predefined styles, a component library, and usage guidelines.</div>
                    <div className="container mt-5 flex justify-start items-center">
                        <div className="img bg-red-600 h-16 w-16 rounded-full">
                            <img className="h-16 w-16 rounded-full object-cover" src={man} alt="Author" />
                        </div>
                        <div className="info-box ml-4">
                            <div className="name">Adham Dhannaway</div>
                            <div className="date">21 July 2023</div>
                        </div>
                    </div>
                </div>

                {/* Additional Cards */}
                <div className="card w-[67%]  p-3 m-10 max-sm:w-[90%]">

                    <div className="img">
                        <img className="rounded-xl" src={blogImg2} alt="Blog" />
                    </div>
                    <div className="heading text-2xl font-bold mt-4 sm:text-5xl">10 best Figma plugins for web design in 2025</div>
                    <div className="text1 text-xl mt-4 w-[90%]">Top Figma plugins to help you design better websites, faster.</div>
                    <div className="container mt-5 flex justify-start items-center">
                        <div className="img bg-red-600 h-16 w-16 rounded-full">
                            <img className="h-16 w-16 rounded-full object-cover" src={man} alt="Author" />
                        </div>
                        <div className="info-box ml-4">
                            <div className="name">Adham Dhannaway</div>
                            <div className="date">21 July 2023</div>
                        </div>
                    </div>
                </div>

                <div className="card w-[67%]  p-3 m-10 max-sm:w-[90%]">

                    <div className="img">
                        <img className="rounded-xl" src={blogImg3} alt="Blog" />
                    </div>
                    <div className="heading text-2xl font-bold mt-4 sm:text-5xl">Best design system examples in 2025</div>
                    <div className="text1 text-xl mt-4 w-[90%]">Key things I’ve learned from studying top design system examples to help you build or improve your own design system.</div>
                    <div className="container mt-5 flex justify-start items-center">
                        <div className="img bg-red-600 h-16 w-16 rounded-full">
                            <img className="h-16 w-16 rounded-full object-cover" src={man} alt="Author" />
                        </div>
                        <div className="info-box ml-4">
                            <div className="name">Adham Dhannaway</div>
                            <div className="date">21 July 2023</div>
                        </div>
                    </div>
                </div>

                <div className="card w-[67%]  p-3 m-10 max-sm:w-[90%]">

                    <div className="img">
                        <img className="rounded-xl" src={blogImg4} alt="Blog" />
                    </div>
                    <div className="heading text-2xl font-bold mt-4 sm:text-5xl">How to design a logo – a step by step guide</div>
                    <div className="text1 text-xl mt-4 w-[90%]">A logical step by step logo design process to design any type of logo in minutes not hours.</div>
                    <div className="container mt-5 flex justify-start items-center">
                        <div className="img bg-red-600 h-16 w-16 rounded-full">
                            <img className="h-16 w-16 rounded-full object-cover" src={man} alt="Author" />
                        </div>
                        <div className="info-box ml-4">
                            <div className="name">Adham Dhannaway</div>
                            <div className="date">21 July 2023</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blog;
