import React from 'react';
import { useAuth } from '../context/AuthContext';
import Organization from '../icons/home_organization.png';
import Direct_Help from '../icons/home_direct_help.png';
import Medical_Help from '../icons/home_medical_help.png';

const Home = () => {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 flex flex-col md:flex-row justify-center items-center md:items-center gap-x-16">
        {/* Left text */}
        <div className="md-6 text-left max-w-md">
          <h1 className="text-4xl font-lato font-bold text-primary mb-4">
            Make Someone's <span className="text-red-500">Life</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6 break-words">
            Donate to our charity with confidence using secure and transparent blockchain technologies.
          </p>

          <br />
          <p className="text-2xl font-actor text-primary mb-6 break-words">
            Donate Today!
          </p>

          <div className="flex space-x-4">
            {isLoggedIn ? (
              <a
                href="/campaigns"
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                View Campaigns
              </a>
            ) : (
              <>
                <a
                  href="/login"
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="./images/hero-image.png"
            alt="Charity"
            className="rounded-lg shadow-lg max-w-full md:max-w-[600px] md:max-h-[600px]"
          />
        </div>
      </section>

      {/* Features Section */}
      < section className="bg-white py-16" >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-lg fond-[800] text-[#1C2480] mb-8">Our Features</h2>
          <h2 className="text-2xl text-primary font-[500] font-lato leading-[40px] tracking-[0.2px] mb-8">
            Whatever It Is That You Care About, There Will Be a Charity Working On It.
            <br />
            Charities help in lots of different ways.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="p-6 rounded-lg">
              {/* <div className="text-red-500 text-4xl mb-4">🏢</div> */}
              <div className="flex justify-center items-center">
                <img
                  src={Organization}
                  alt="Organization"
                  className="organization mb-4 max-w-[100px] max-h-[100px] filter brightness-0 saturate-100 text-pink-500"
                  style={{ filter: 'invert(86%) sepia(20%) saturate(5000%) hue-rotate(300deg) brightness(95%) contrast(85%)', }}
                />
              </div>
              <h3 className="text-lg text-primary mb-2">Organization</h3>
              <p className="text-gray-600">Write your text here write your text here write your text here.</p>
            </div>

            <div className="p-6 rounded-lg">
              {/* <div className="text-red-500 text-4xl mb-4">🏢</div> */}
              <div className="flex justify-center items-center">
                <img
                  src={Direct_Help}
                  alt="Organization"
                  className="organization mb-4 max-w-[100px] max-h-[100px] filter brightness-0 saturate-100 text-pink-500"
                  style={{ filter: 'invert(86%) sepia(20%) saturate(5000%) hue-rotate(300deg) brightness(95%) contrast(85%)', }}
                />
              </div>
              <h3 className="text-lg text-primary mb-2">Direct Help</h3>
              <p className="text-gray-600">Write your text here write your text here write your text here.</p>
            </div>

            <div className="p-6 rounded-lg">
              {/* <div className="text-red-500 text-4xl mb-4">🏢</div> */}
              <div className="flex justify-center items-center">
                <img
                  src={Medical_Help}
                  alt="Organization"
                  className="organization mb-4 max-w-[100px] max-h-[100px] filter brightness-0 saturate-100 text-pink-500"
                  style={{ filter: 'invert(86%) sepia(20%) saturate(5000%) hue-rotate(300deg) brightness(95%) contrast(85%)', }}
                />
              </div>
              <h3 className="text-lg text-primary mb-2">Medical Help</h3>
              <p className="text-gray-600">Write your text here write your text here write your text here.</p>
            </div>
          </div>
        </div>
      </section >

      <footer className="py-16">
        <div className="container justify-center items-center mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* left */}
          <div className="md:col-span-1">
            <div className="flex flex-col items-start">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/51ca0c4924b8bfb92cbbe4a82d80243e7d8ce83d?placeholderIfAbsent=true&apiKey=25764a6927e6464da1bc6d0860af1c32" alt="Logo" className="mb-4 w-16 h-16" />
              <h3 className="text-lg font-bold text-indigo-800 mb-4">ABOUT US</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:underline">FAQ</a></li>
                <li><a href="#" className="text-gray-600 hover:underline">Investors</a></li>
                <li><a href="#" className="text-gray-600 hover:underline">Help</a></li>
              </ul>
            </div>
          </div>

          {/* right */}
          <div className="md:col-span-2">
            <div className="flex flex-col space-y-8">
              <h3 className="text-lg font-bold text-indigo-800">
                Giving Help Is Highest Form Of Love.
              </h3>
              <div>
                <h3 className="text-lg font-bold text-indigo-800 mb-4">CONTACT US</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2">📞</span> 123-456-789
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">📧</span> abcd@gmail.com
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">📍</span> idk, where the company is located
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;