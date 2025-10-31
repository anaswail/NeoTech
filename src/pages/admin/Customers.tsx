import profileImg from "../../assets/profile.png";

const Customers = () => {
  return (
    <div className="flex gap-18 flex-wrap ">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
        <div
          key={index}
          className="customer flex items-center w-64 gap-10 p-4 bg-white rounded-lg shadow-md"
        >
          <div className="img w-12 h-12 rounded-full overflow-hidden">
            <img src={profileImg} alt="profile" />
          </div>
          <div className="text">
            <h2 className="text-xl font-bold">Anas Wael</h2>
            <p className="font-semibold">5 Orders</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Customers;
