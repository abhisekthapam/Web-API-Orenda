import React from "react";
import TheFooter from "./TheFooter";

function TheContactUs() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex flex-col gap-2 md:gap-4 md:flex-row justify-between px-[2%] md:px-[4%] lg:px-[10%]">
        <div className="w-full md:w-[30%] text-xs text-gray-700 font-semibold flex justify-start md:justify-center">
          <div className="h-full w-full">
            <div className="bg-white rounded-md shadow-lg p-2 flex flex-col gap-2">
              <p>Orenda Noodles</p>
              <p>Dillibazar, Kathmandu 44600</p>
              <p>+977 1-4441577</p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.759263853499!2d85.3292342!3d27.7060856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190a74aa1f23%3A0x74ebef82ad0e5c15!2sSoftwarica%20College%20of%20IT%20and%20E-Commerce!5e0!3m2!1sen!2snp!4v1713524895610!5m2!1sen!2snp"
              width="100%"
            height="550"
            style={{ border: 0 }}
            loading="lazy"
            title="Orenda Noodles Location"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <TheFooter />
    </div>
  );
}

export default TheContactUs;
