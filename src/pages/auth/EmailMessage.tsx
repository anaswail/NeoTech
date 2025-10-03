import { Mail } from "lucide-react";
import emailSend from "../../assets/sendEmail.gif";
import emailDecoration1 from "../../assets/emailDecoration1.gif";
import emailDecoration2 from "../../assets/emailDecoration2.gif";
import emailDecoration3 from "../../assets/emailDecoration3.gif";
import emailDecoration4 from "../../assets/emailDecoration4.gif";

const EmailMessage = () => {
  return (
    <div className=" absolute top-0 left-0 bg-white z-50 h-screen w-full flex justify-center items-center flex-col gap-5 ">
      <img
        src={emailDecoration1}
        alt="decoration"
        className=" absolute max-md:opacity-70 max-md:w-10 max-lg:left-1 top-20 left-10 -rotate-30 opacity-80 "
      />
      <img
        src={emailDecoration2}
        alt="decoration"
        className=" absolute max-md:opacity-70 max-md:w-10 max-lg:left-3 max-lg:top-60 top-70 left-15 rotate-30 opacity-80 "
      />
      <img
        src={emailDecoration3}
        alt="decoration"
        className=" absolute max-md:opacity-70 max-md:w-10 max-lg:right-1 top-20 right-20 rotate-30 opacity-80 "
      />

      <img
        src={emailDecoration1}
        alt="decoration"
        className=" absolute max-md:opacity-70 max-md:w-10 max-lg:right-5 max-lg:top-60 top-70 right-15 -rotate-30 opacity-80 "
      />

      <img
        src={emailDecoration4}
        alt="decoration"
        className=" absolute max-md:hidden max-lg:right-25 max-lg:top-40 top-40 right-50  opacity-80 "
      />

      <img
        src={emailDecoration4}
        alt="decoration"
        className=" absolute max-md:hidden max-lg:left-25 max-lg:top-40 top-40 left-50  opacity-80 "
      />

      <h1 className="text-5xl opacity-30 font-bold absolute top-1/4 max-md:text-3xl ">
        Neo<span className="text-txt-secondary2">Tech</span>
      </h1>

      <h1 className="absolute bottom-10 text-xl font-bold opacity-80 max-md:text-sm">
        Developed By <span className="text-txt-secondary2">Anas & Hagar</span>
      </h1>

      <img src={emailSend} alt="sendEmail" />
      <h1 className="text-2xl font-bold text-center max-md:text-lg px-5">
        The activation email has been sent to your email address.
      </h1>
      <button
        onClick={() => {
          window.location.replace("https://mail.google.com");
        }}
        className=" bg-txt-secondary2 text-white p-3 rounded-sm text-lg flex gap-2 items-center max-md:text-md cursor-pointer hover:bg-txt-secondary2/80 duration-300"
      >
        Check your inbox
        <Mail />
      </button>
    </div>
  );
};

export default EmailMessage;
