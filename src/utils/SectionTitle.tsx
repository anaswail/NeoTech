const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-1">
      <span className="h-10 w-3 bg-txt-secondary2 rounded-xs"></span>
      <h1 className="section-title relative pl-6 ">{title}</h1>
    </div>
  );
};

export default SectionTitle;
