"use client";

type TitleProps = {
  title: string;
  Icon: React.ElementType;
};

const Title = ({ title, Icon }: TitleProps) => {
  return (
    <div className="flex items-cetner gap-2 mt-6 text-3xl font-bold leading-none">
      {title}
      <Icon className="text-blue-500 text-3xl leading-none" />
    </div>
  );
};

export default Title;
