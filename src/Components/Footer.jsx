import React from 'react';

function Footer({ workLatest,img1, img2, img3 }) {
  return (
    <>
      <footer className="bg-slate-100 p-10 border border-gray-300">
        <p className="text-center underline text-gray-700 text-lg">
          {workLatest}
        </p>
        <div className="container mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="work1 rounded-lg bg-slate-200 border border-zinc-100">
            <div className="container-img p-3">
              <div className="img">
                <img
                  className="w-full h-auto rounded-xl"
                  src={img1}
                  alt="UI design book cover"
                />
              </div>
              <div className="design-book mt-4 text-gray-700">My UI design book</div>
              <pre className="text-gray-700">Book</pre>
            </div>
          </div>
          <div className="work1 rounded-lg bg-slate-200 border border-zinc-100">
            <div className="container-img p-3">
              <div className="img">
                <img
                  className="w-full h-auto rounded-xl"
                  src={img2}
                  alt="UI design book cover"
                />
              </div>
              <div className="design-book mt-4 text-gray-700">My UI design book</div>
              <pre className="text-gray-700">Book</pre>
            </div>
          </div>
          <div className="work1 rounded-lg bg-slate-200 border border-zinc-100">
            <div className="container-img p-3">
              <div className="img">
                <img
                  className="w-full h-auto rounded-xl"
                  src={img3}
                  alt="UI design book cover"
                />
              </div>
              <div className="design-book mt-4 text-gray-700">My UI design book</div>
              <pre className="text-gray-700">Book</pre>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
