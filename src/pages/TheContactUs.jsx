import React from "react";
import TheFooter from "./TheFooter";

function TheContactUs() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex flex-col gap-2 md:gap-4 md:flex-row justify-between px-[2%] md:px-[4%] lg:px-[10%]">
        <div className="w-full md:w-[30%] text-xs text-gray-700 font-semibold flex justify-start md:justify-center">
          <div className="h-full w-full">
            <div className="bg-white rounded-md shadow-lg p-2 flex flex-col gap-2">
              <p>Cold and Hot Spicy Noodles</p>
              <p>P9F6+7Q7, Boudha Rd, Kathmandu 44600</p>
              <p>+977 9818924679</p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.809519975833!2d85.35936167525443!3d27.72316687617356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1b82dea811d5%3A0x79b41747d875964c!2sCold%20and%20Hot%20Spicy%20Noodles!5e0!3m2!1sen!2snp!4v1713524895610!5m2!1sen!2snp"
            width="100%"
            height="550"
            style={{ border: 0 }}
            loading="lazy"
            title="Cold and Hot Spicy Noodles Location"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <TheFooter />
    </div>
  );
}

export default TheContactUs;
