import Heading from "@/components/Heading";
import about from "../assets/Gemini_Generated_Image_57m84057m84057m8.png";

const About = () => {
  return (
    <div className="container mx-auto px-4 mt-24 sm:mt-32">
      <div className="details flex  gap-8 ">
        <div className="text w-2/3">
          <h1 className="text-4xl font-bold mb-5 bg-gradient-to-tr from-[#0f1c70] to-[#7a1b86] bg-clip-text text-transparent">
            Who Are We?
          </h1>
          <p className="leading-8 w-[90%]">
            Anas Wael and Hagar Gamal are two passionate developers working
            together to build creative and full-featured web projects. Anas Wael
            is a Front-End Developer with two years of experience, studying at
            Al-Azhar University (Faculty of Media). He specializes in React,
            TailwindCSS, Redux Toolkit, TypeScript, and various CSS/JavaScript
            libraries to craft modern and responsive interfaces. Hagar Gamal is
            a Back-End Developer with two years of experience, graduated from
            Zagazig University (Faculty of Computers and Information). She
            focuses on Node.js, Express, NestJS, TypeScript, and MongoDB to
            build secure and scalable systems. Together, they combine design and
            functionality to create seamless and innovative web experiences.
          </p>
        </div>
        <div className="Img w-1/3 flex justify-center items-center relative hover:-translate-1 after:content-[''] after:absolute after:w-full after:h-full after:top-0 after:left-0 after:-z-10 after:rounded-md after:bg-gradient-to-r after:from-[#0f1c70] after:to-[#7a1b86] after:duration-300 hover:after:top-4 hover:after:left-4 duration-300">
          <img
            src={about}
            alt="developed by anas & Hagar"
            className="w-full bg-cover rounded-md "
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default About;
