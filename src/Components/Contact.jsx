import React from 'react'
import section from '../assets/profile_photo.jpg'

function Contact() {
  return (
    <>
  <div className="contact-box p-10 flex flex-col md:flex-row justify-center items-center">
  <div className="contact w-full md:w-[50%]">
    <h1 className="text-7xl font-bold text-center">Contact</h1>

    <div className="links list-none mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">

      <li className="text-4xl flex items-center space-x-2">
        <i className="fab fa-facebook text-blue-800"></i>
        <span className="text-blue-800 text-xl">Facebook</span>
      </li>
      <li className="text-4xl flex items-center space-x-2">
        <i className="fab fa-instagram text-pink-900"></i>
        <span className="text-pink-600 text-xl">Instagram</span>
      </li>
      <li className="text-4xl flex items-center space-x-2">
        <i className="fab fa-x-twitter"></i>
        <span className="text-xl">x</span>
      </li>
      <li className="text-4xl flex items-center space-x-2">
        <i className="fab fa-linkedin text-blue-500"></i>
        <span className="text-blue-500 text-xl">Linkedin</span>
      </li>
    </div>
  </div>
  <div className="img-box w-full md:w-[50%] bg-red-300 mt-12 md:mt-0">
    <img src={section} alt="" />
  </div>
</div>



    </>
  )
}

export default Contact