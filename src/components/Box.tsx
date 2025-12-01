type Props = {
  children: React.ReactNode;
  title: string;
};

export const Box = ({ children, title }: Props) => (
  <article className="flex flex-1 flex-col items-center gap-4 sm:max-w-[400px]">
    <h2 className="text-xl font-semibold">{title}</h2>
    <div className="flex-1 border rounded-lg p-6 pt-[4rem] w-full relative">
      {children}
    </div>
  </article>
);
