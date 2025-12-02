import { forwardRef } from "react";

type Props = {
  onChange: () => void;
};

export const SearchInput = forwardRef<HTMLInputElement, Props>(
  ({ onChange }, ref) => (
    <div className="absolute top-8 left-6">
      <span className="absolute top-[8px] left-[8px] text-[0.8rem]">🔍</span>
      <input
        type="text"
        placeholder="search"
        className="pl-7 pr-3 py-1 border rounded-2xl w-64"
        onChange={onChange}
        ref={ref}
      />
    </div>
  )
);
