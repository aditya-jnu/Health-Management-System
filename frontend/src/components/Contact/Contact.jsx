import React from 'react';

export default function Contact() {
    return (
        <div className="mx-auto w-full max-w-full">
            {/* Hero Section */}
            <aside className="relative overflow-hidden text-white sm:mx-16 mx-2 sm:py-16">
                <div className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center space-y-8 text-center">
                        <div className="flex-1 max-w-xl space-y-8">
                            <h2 className="text-6xl md:text-6xl font-bold sm:text-4xl">
                                Contact Us
                            </h2>
                            <div className="py-3 my-3">
                                <hr className="w-14 mx-auto border-t-8 border-green-400" />
                            </div>
                            <span className="text-3xl md:text-3xl sm:text-2xl block">
                                Get in touch with us for any inquiries or assistance regarding your health management journey.
                            </span>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 w-full sm:pt-1 pt-12 h-full filter blur-sm">
                    <img className="w-full h-full object-cover" src="/assets/mediContact1.png" alt="Contact Hero" />
                </div>
            </aside>

            {/* Contact Details and Form Section */}
            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 p-8">
                {/* Address Section */}
                <div className="w-full md:w-1/2 bg-green-50 p-6 rounded-lg shadow-lg">
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center">
                                <img src="/assets/location.png" alt="Address" className="h-6 w-6 mr-2" />
                                <h2 className="text-2xl font-bold">Address</h2>
                            </div>
                            <div className="text-lg pl-8">
                                <h1 className="font-bold">HealthCare Center</h1>
                                <p>123 Wellness Street, Healthy City,<br />New Delhi, India - 110092</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <img src="/assets/telephone.jpg" alt="Telephone" className="h-6 w-6 mr-2" />
                            <span className="text-lg">+91 98765 43210</span>
                        </div>
                        <div className="flex items-center">
                            <img src="/assets/phone.png" alt="Mobile" className="h-6 w-6 mr-2" />
                            <span className="text-lg">+91 12345 67890</span>
                        </div>
                        <div className="flex items-center">
                            <img src="/assets/email.png" alt="Email" className="h-6 w-6 mr-2" />
                            <span className="text-lg">support@healthcare.com</span>
                        </div>
                        <div className="flex items-center">
                            <img src="/assets/global.png" alt="Website" className="h-6 w-6 mr-2" />
                            <span className="text-lg">
                                <a href="http://localhost:5173/" className="text-green-500 hover:underline">
                                    www.healthcare.com
                                </a>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="w-full md:w-1/2 bg-green-50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-lg font-medium">Name</label>
                            <input type="text" id="name" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Your Name" />
                        </div>
                        <div>
                            <label htmlFor="contact" className="block text-lg font-medium">Contact</label>
                            <input type="tel" id="contact" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Your Contact Number" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium">Email</label>
                            <input type="email" id="email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Your Email" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-lg font-medium">Message</label>
                            <textarea id="message" rows="4" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Your Message"></textarea>
                        </div>
                        <button type="submit" className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-600">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}


