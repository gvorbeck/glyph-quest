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
      <Text
        font
        className={`${bottomSize} text-center font-bold bg-amber pb-1 text-darkGray`}
      >
        {bottom}
      </Text>
    </div>
  );
};

export default BorderedBox;
