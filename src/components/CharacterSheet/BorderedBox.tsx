import Text from "../Text";

type BorderedBoxProps = {
  top: React.ReactNode;
  bottom: string | React.ReactNode;
  bottomSize?: string;
};

const BorderedBox: React.FC<
  BorderedBoxProps & React.ComponentPropsWithRef<"div">
> = ({ className, top, bottom, bottomSize = "text-lg" }) => {
  const classNames = [
    "border border-solid border-amber rounded flex flex-col justify-between",
    className,
  ].join(" ");

  return (
    <div className={classNames}>
      {top}
      <div
        className={`${bottomSize} font-jaini-purva text-center font-bold bg-amber pb-1 text-darkGray`}
      >
        {bottom}
      </div>
    </div>
  );
};

export default BorderedBox;
