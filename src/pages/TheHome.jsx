import React, { useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import keemaNoodle from "../assets/Keema.png";
import TheSmallScreenHome from "../small-screen/pages/TheSmallScreenHome";

const TheHome = () => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(
    new Array(5).fill(false)
  );
  const [isPlusVisible, setIsPlusVisible] = useState(new Array(5).fill(true));
  const answerRefs = useRef([]);

  const questions = [
    "1. Premium Quality Ingredients",
    "2. Variety to Suit Every Palate",
    "3. Seamless Ordering Experience",
    "4. Fast and Reliable Delivery",
    "5. Exceptional Customer Service",
  ];
  const answers = [
    "We handpick the freshest and finest ingredients, ensuring each dish bursts with authentic flavor and goodness.",
    "From refreshing salads to fiery curries, our diverse menu caters to every taste bud, ensuring there's something for everyone to savor.",
    "Our user-friendly web application, crafted with ReactJS and Tailwind CSS, ensures ordering your favorites is a breeze. With just a few clicks, you can explore our menu, customize your order, and await doorstep delivery.",
    "We understand the importance of timely delivery, striving to ensure your order reaches you promptly and in pristine condition, every time.",
    "Your satisfaction is our utmost priority. Our dedicated team is always on standby to assist you with any queries or concerns, ensuring your Cold and Hot Spicy experience is nothing short of exceptional.",
  ];

  const showAnswer = (index) => {
    setIsAnswerVisible((prevState) => prevState.map((_, i) => i === index));
    setIsPlusVisible((prevState) => prevState.map((_, i) => i !== index));
  };

  const hideAnswer = (index) => {
    setIsAnswerVisible((prevState) =>
      prevState.map((val, i) => (i === index ? false : val))
    );
    setIsPlusVisible((prevState) =>
      prevState.map((val, i) => (i === index ? true : val))
    );
  };

  return (
    <div>
      <div className="hidden lg:block">
        <div className="flex flex-col gap-[1rem] lg:gap-[5rem]">
          <section className="px-[5%] md:px-[7%] lg:px-[12%]">
            <div className="flex justify-between">
              <div className="py-[5%] md:py-[8%] w-full lg:w-[55%] flex flex-col gap-9">
                <div>
                  <div className="md:flex md:justify-between">
                    <div>
                      <h1 className="heading leading-8 text-sm md:text-[24px] mb-5 md:mb-[36px] text-accent font-lora">
                        Welcome to <br className="hidden md:block lg:hidden" />{" "}
                        Orenda
                      </h1>
                      <p className="text-3xl leading-none md:text-[54px] font-bold font-cardo">
                        Experience culinary excellence
                      </p>
                    </div>
                    <div>
                      <div className="lg:hidden w-full">
                        <img
                          src={keemaNoodle}
                          alt="Keema Noodle"
                          title="Keema Noodle"
                          className="w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="leading-8 py-6 font-cardo text-secondary">
                    Step into our portal for unforgettable dining experiences.
                    Explore our diverse menu, effortlessly place your order, and
                    elevate your palate with unparalleled ease. Join us as we
                    embark on a journey of simplified culinary bliss.
                  </p>
                </div>
                <div className="flex justify-center md:justify-start font-cardo">
                  <Link to="/menu">
                    <button className="order px-2 py-1 md:px-4 md:py-2">
                      Order Now
                    </button>
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block w-full md:w-[40%]">
                <img
                  src={keemaNoodle}
                  alt="Keema Noodle"
                  title="Keema Noodle"
                  className="w-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          <section className="px-[2%] md:px-[10%]">
            <div className="flex flex-col gap-2 mb-7">
              <p className="heading-part-font">Popular Dishes</p>
              <p className="heading-part text-[27px] md:text-[31px]">
                Our Exclusive Items
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-6"></div>
          </section>

          <section className="px-[2%] md:px-[10%] mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 heading-part-font leading-8">
              <div className="p-2 bg-white shadow-custom-shadow rounded-md">
                <p>Our Story</p>
                <p className="heading-part text-[27px] md:text-[31px] mt-5">
                  The tale of Cold and Hot Spicy
                </p>
                <p className="px-[3%]">
                  <span className="heading-part text-[22px] md:text-[25px]">
                    is
                  </span>{" "}
                  one of passion and culinary adventure. It all started with a
                  shared love for exceptional food and a vision to create an
                  effortless dining experience for food enthusiasts like you. As
                  aficionados of both comforting cold dishes and zestful hot
                  delicacies, we envisioned a platform that warmly welcomes
                  diverse culinary traditions while graciously offering the
                  convenience of ordering from within the comforting confines of
                  our restaurant.
                </p>
              </div>
              <div className="p-2 bg-white shadow-custom-shadow rounded-md">
                <p>Our Mission</p>
                <p className="heading-part text-[27px] md:text-[31px] mt-5">
                  At Cold and Hot Spicy
                </p>
                <p className="px-[3%]">
                  <span className="heading-part text-[22px] md:text-[25px]">
                    we
                  </span>{" "}
                  're not just about food, we're about crafting unforgettable
                  dining experiences. Our mission is simple – to elevate your
                  moments of indulgence with impeccable service, an extensive
                  array of tantalizing dishes, and a user-friendly interface
                  that makes ordering an absolute joy. We aim to surpass your
                  expectations with every bite, ensuring each meal leaves you
                  fulfilled and eager for more.
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3 py-3 bg-white shadow-custom-shadow rounded-md">
              <p className="heading-part text-[27px] md:text-[31px] text-center pt-4">
                Why Choose Cold and Hot Spicy?
              </p>
              {questions.map((question, index) => (
                <div key={index} className="border-b py-3 px-[3%]">
                  <div ref={(el) => (answerRefs.current[index] = el)}>
                    <div className="flex justify-between items-center">
                      <div className="question text-[18px] md:text-[20px] px-2">
                        <p>{question}</p>
                      </div>
                      <div className="mr-[2%]">
                        {isPlusVisible[index] && (
                          <button onClick={() => showAnswer(index)}>
                            <IoIosArrowDown />
                          </button>
                        )}
                        {!isPlusVisible[index] && (
                          <button onClick={() => hideAnswer(index)}>
                            <IoIosArrowUp />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="heading-part-font md:text-start leading-7 px-[7%] md:px-[3%]">
                      {isAnswerVisible[index] && <p>{answers[index]}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="lg:hidden">
        <TheSmallScreenHome />
      </div>
    </div>
  );
};

export default TheHome;
