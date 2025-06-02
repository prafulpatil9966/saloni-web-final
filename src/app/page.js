import React from 'react';

const HomePage = () => {
  return (
    <div className="font-sans text-gray-700">

      {/* Hero Section */}
      <section className="bg-pink-100 py-16 px-4 text-center md:text-left md:flex md:items-center md:justify-between">
        <div className="max-w-xl mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-700 mb-4">
            Feel Beautiful. Be Confident.
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Welcome to Glamour Touch Beauty Parlor. Discover expert care in a relaxing environment.
          </p>
          <a href="#contact" className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition">
            Book an Appointment
          </a>
        </div>
        <img
          src="/images/hero-beauty.png"
          alt="Beauty"
          className="w-full max-w-md rounded-lg shadow-lg mx-auto md:mx-0"
        />
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-white text-center">
        <h2 className="text-3xl font-bold text-pink-700 mb-10">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: "Hair Styling", desc: "Trendy cuts, color, and treatments tailored to you." },
            { title: "Facials", desc: "Glow-enhancing skincare for all skin types." },
            { title: "Bridal Makeup", desc: "Flawless looks for your special day." }
          ].map((service, index) => (
            <div key={index} className="bg-pink-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-pink-600 mb-2">{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-pink-50 py-16 px-4 text-center md:text-left md:flex md:items-center md:gap-10">
        <img
          src="/images/about-us.jpg"
          alt="About Us"
          className="w-full max-w-md rounded-lg shadow-lg mx-auto md:mx-0 mb-6 md:mb-0"
        />
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold text-pink-700 mb-4">About Glamour Touch</h2>
          <p className="text-gray-600 mb-4">
            With over 10 years of experience, we are passionate about helping you feel your best. Our trained professionals use premium products to give you the perfect beauty experience.
          </p>
          <a href="#contact" className="inline-block bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700 transition">
            Learn More
          </a>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 bg-white text-center">
        <h2 className="text-3xl font-bold text-pink-700 mb-10">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {["gallery1.jpg", "gallery2.jpg", "gallery3.jpg", "gallery4.jpg"].map((img, i) => (
            <img
              key={i}
              src={`/images/${img}`}
              alt={`Gallery ${i + 1}`}
              className="rounded-lg shadow-md hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </section>

      {/* Contact / Booking Section */}
      <section id="contact" className="bg-pink-600 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Book Your Appointment Today</h2>
        <p className="mb-6">Call us or visit our salon to reserve your slot with our professionals.</p>
        <a
          href="tel:+1234567890"
          className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-full hover:bg-pink-100 transition"
        >
          📞 +1 234 567 890
        </a>
      </section>

    </div>
  );
};

export default HomePage;
