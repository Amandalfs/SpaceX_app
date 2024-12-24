import clsx from "clsx";
import { RocketStatusProps } from "./type";

export const RocketStatus = ({ status }: RocketStatusProps) => {
  const statusClasses = clsx(
    "h-4 w-4 shadow-md",
    {
      "bg-violet-700": status === "violet",
      "bg-[#6366f1]": status === "blue",
      "bg-[#6ee7b7]": status === "gray",
      "bg-[#475569]": status === "black",
    }
  );

  return (
    <div className={statusClasses} role="status" />
  );
};

