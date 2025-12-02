type Props = {
  children: React.ReactNode;
  title: string;
};

export const Box = ({ children, title }: Props) => (
  <article className="flex flex-1 flex-col items-center sm:max-w-[400px]">
    <h2 className="text-xl font-semibold self-start translate-y-[10px] ml-4 bg-white px-2 z-10 bg-white">
      {title}
    </h2>
    <div className="flex-1 border rounded-lg p-6 pt-[6rem] w-full relative">
      {children}
    </div>
  </article>
);
