'use client'

import React from 'react'

const Location = () => {
    return (
      <section className="max-w-5xl mx-auto my-12 p-8 flex flex-col md:flex-row gap-8 items-center">
        {/* Map */}
        <div className="w-full md:w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1590.697019655445!2d40.0068497!3d-3.3539032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x181581005fb75f4b%3A0x2c771b504a546b2c!2sTapps%20Broilers%20Enterprise!5e1!3m2!1sen!2ske!4v1695657600000!5m2!1sen!2ske"
            width="100%"
            height="300"
            style={{
              border: 0,
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Tapps Broilers Enterprise Location"
          ></iframe>
        </div>
        {/* Info */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <p className="mb-4 text-gray-600">
            Located in the heart of Watamu's countryside, our farm is easily
            accessible for customers who want to see where their quality
            broilers are raised.
          </p>
          <div className="space-y-2">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="ri-map-pin-line text-green-600"></i>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-1">Address</h5>
                  <p className="text-gray-600">
                    Jiwe-leupe, Watamu, Kilifi County, Kenya
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="ri-phone-line text-green-600"></i>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-1">Contact</h5>
                  <p className="text-gray-600">0769751566</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="ri-time-line text-green-600"></i>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-1">
                    Farm Hours
                  </h5>
                  <p className="text-gray-600">
                    Monday - Sunday: 6:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="ri-car-line text-green-600"></i>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-1">
                    Getting Here
                  </h5>
                  <p className="text-gray-600">
                    Free parking available. Farm tours by appointment.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="bg-green-100 rounded-lg p-4 mt-4 flex items-center gap-2">
            <span className="text-green-600">ℹ️</span>
            <span>
              <span className="font-semibold">Farm Visits</span><br />
              Interested in seeing how we raise our broilers? Call us to schedule a farm tour and experience our quality standards firsthand.
            </span>
          </div> */}
        </div>
      </section>
    )
}

export default Location
