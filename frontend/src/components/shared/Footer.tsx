import { Link } from "react-router-dom";
// import Logo from "../../assets/logo/logo.png";
import { Text } from "../atom/Text";
import { quickLinks, support } from "../../data/ContentData";
import { FaDiscord, FaInstagramSquare, FaTelegram, FaTwitter } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const Footer = () => {
    return (
        <footer className="w-full mb-0">
            <div className="pt-20 pb-[30px] md:px-14 px-5 border-t-[#151d23] border-t border-solid">
                <div className="container">
                    <div className="w-full grid lg:grid-cols-4 md:grid-cols-2">

                        <div className=" mt-0 mb-[50px] mx-0 ">
                            {/* <div className="footer-logo logo mt-0 mb-[30px] mx-0">
                                <Link to="/"><img className="max-w-[177px]" src={Logo}
                                    alt="Logo" /></Link>
                            </div> */}
                            <div className=" mr-[30px] sm:mr-0 xsm:mr-0">
                                <Text as="p" className=" text-[15px] mt-0 mb-[25px] mx-0">
                                Follow us on social media to connect with fellow gamers, share your experiences, and be the first to know about exciting events and promotions.
                                </Text>
                                <Text as="p"
                                    className="text-[16px] font-semibold uppercase text-[#ecebeb] leading-none mt-0 mb-[25px] mx-0">
                                    Active <span className=" text-[#58105a]">With Us <i
                                        className="fas fa-angle-double-right"></i></span></Text>
                                <div className="flex flex-wrap gap-[10px_20px]">
                                    <a className="block text-xl md:text-3xl text-myGreen hover:text-myYellow" href="/">
                                        <FaDiscord />
                                    </a>
                                    <a className="block text-xl md:text-3xl text-myGreen hover:text-myYellow" href="/">
                                        <FaTwitter />
                                    </a>
                                    <a className="block text-xl md:text-3xl text-myGreen hover:text-myYellow" href="/">
                                        <FaInstagramSquare />
                                    </a>
                                    <a className="block text-xl md:text-3xl text-myGreen hover:text-myYellow" href="/">
                                        <FaTelegram />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className=" mt-0 mb-[50px] mx-0 lg:pl-20">
                            <Text className="uppercase font-belanosima  text-[20px] mt-0 mb-7 mx-0 ">quick link</Text>
                            <ul className=" m-0 p-0 ">
                                {
                                    quickLinks.map((link, index) => (
                                        <li className=" mt-0 mb-1.5 mx-0" key={index}><Link
                                            className=" text-[15px] inline-block text-[#adb0bc] relative hover:text-[#58105a]  after:content-[''] after:absolute after:w-full after:h-px after:origin-[right_top] after:transition-transform after:duration-[0.4s] after:ease-[cubic-bezier(0.74,0.72,0.27,0.24)] after:scale-x-0 after:scale-y-100 after:left-0 after:bottom-0 after:bg-[#58105a]  hover:after:origin-[left_top] hover:after:scale-100"
                                            to={link.path as string}>{link.name}</Link></li>
                                    ))
                                }

                            </ul>
                        </div>

                        <div
                            className=" mt-0 mb-[50px] mx-0 lg:pl-20">
                            <h4 className="f  text-[20px] mt-0 mb-7 mx-0 ">Supports</h4>
                            <ul className=" m-0 p-0  menu">
                                {
                                    support.map((link, index) => (
                                        <li className=" mt-0 mb-1.5 mx-0" key={index}><Link
                                            className=" text-[15px] inline-block text-[#adb0bc] relative hover:text-[#58105a]  after:content-[''] after:absolute after:w-full after:h-px after:origin-[right_top] after:transition-transform after:duration-[0.4s] after:ease-[cubic-bezier(0.74,0.72,0.27,0.24)] after:scale-x-0 after:scale-y-100 after:left-0 after:bottom-0 after:bg-[#58105a]  hover:after:origin-[left_top] hover:after:scale-100"
                                            to={link.path as string}>{link.name}</Link></li>
                                    ))
                                }

                            </ul>
                        </div>

                        <div className=" mt-0 mb-[50px] mx-0 ">
                            <h4 className="  text-[20px] mt-0 mb-7 mx-0 ">Newsletter</h4>
                            <div className="footer-newsletter">
                                <p className=" text-[15px] mt-0 mb-[25px] mx-0">Subscribe our newsletter to get our latest
                                    updates</p>
                                <form action="#" className="footer-newsletter-form relative">
                                    <input type="email" placeholder="Your email address"
                                        className=" block w-full text-[14px] h-[60px] pl-[25px] pr-[100px] py-[17px] rounded-md border-none bg-[#1f2935] placeholder:text-[14px] focus:ring-[none] focus:!border-none " />
                                    <button type="submit"
                                        className=" absolute w-[63px] h-full text-[28px] text-[#1f2935] flex items-center justify-center p-2.5 rounded-md border-[none] right-0 top-0 bg-[#58105a] hover:bg-[#ffbe18] ">
                                        <IoSend />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 py-6 bg-[#090d10]">
                <div className="container">
                    <div className="flex flex-wrap  items-center ">
                        <div className=" text-center ">
                            <p className=" md:text-[14px] text-xs font-semibold text-[#9f9f9f] m-0 font-poppins  w-[90vw]">
                                <span className="ml-20 float-left"> Copyright © 2024 - All Rights Reserved By <span className=" text-[#58105a]">FFBgame.</span> </span> <span className=" text-right float-right font-poppins">  <span className="text-[#58105a]">Privacy </span> <span className="text-[#58105a]">Terms of Use </span>  <span className="text-[#58105a]">Cookies </span></span> </p> 
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer