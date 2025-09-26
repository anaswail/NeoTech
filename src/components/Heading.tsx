const Heading = ({ title }: { title: string }) => {
  return (
    <h1 className="text-xl sm:text-2xl lg:text-headerSection font-semibold mt-4 lg:mt-6">
      {title}
    </h1>
  );
};

export default Heading;
