import clsx from "clsx";

interface RocketStatusProps {
  status: "orange" | "blue" | "gray" | "black";
}

export const RocketStatus = ({ status }: RocketStatusProps) => {
  const statusClasses = clsx(
    "h-4 w-4 shadow-md",
    {
      "bg-orange-50": status === "orange",
      "bg-blue": status === "blue",
      "bg-gray-50": status === "gray",
      "bg-black": status === "black",
    }
  );

  return (
    <div className={statusClasses} role="status" />
  );
};

