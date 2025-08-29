// WorkWithUs.tsx
import OurClients from "../../Components/OurClients";

const WorkWithUs = () => {
  return (
    <section className="grid grid-cols-2 gap-10 items-center px-40 my-20 text-justify">
      <OurClients />

      <div className="flex flex-col gap-5">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">Trusted by Worlds Leading Brands</h1>
        <p>
          At Tusuka, we believe in building long-term partnerships based on trust, 
          innovation, and excellence. By working with us, you’ll have access to 
          industry-leading expertise, a collaborative approach, and solutions 
          tailored to your business needs. 
        </p>
        <p>
          Whether you’re looking to grow your brand, streamline operations, or 
          develop sustainable strategies, our team is ready to support you every 
          step of the way. Together, we can achieve more. 
        </p>
        {/* <button className=" py-3 px-4 rounded-lg bg-gradient-to-r from-[#955DF2] to-[#1E1E9C] text-white font-medium hover:opacity-90 transition duration-200 shadow-md"> */}
        <button className="bg-gradient-to-r from-[#955DF2] to-[#1E1E9C] hover:bg-primary/90 transition text-white py-2 px-6 rounded-lg shadow-md w-max">
          Join With Us
        </button>
      </div>
    </section>
  );
};

export default WorkWithUs;
