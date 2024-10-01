import { Character } from "@/types/character";
import { Typography } from "@mui/material";
import Image from "next/image";

type SettingsBackgroundProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

const itemData = [
  {
    img: null,
    className: "sheet-none",
    title: "None",
  },
  {
    img: "/images/hero_sm.webp",
    className: "sheet-hero",
    title: "Bam",
  },
  {
    img: "/images/cleric_sm.webp",
    className: "sheet-cleric",
    title: "Pow",
  },
  {
    img: "/images/dwarf_sm.webp",
    className: "sheet-dwarf",
    title: "Boom",
  },
  {
    img: "/images/ranger_sm.webp",
    className: "sheet-ranger",
    title: "Zap",
  },
  {
    img: "/images/wizard_sm.webp",
    className: "sheet-wizard",
    title: "Zing",
  },
  {
    img: "/images/thief_sm.webp",
    className: "sheet-thief",
    title: "Woosh",
  },
];

const SettingsBackground: React.FC<SettingsBackgroundProps> = ({
  character,
  setCharacter,
}) => {
  const handleBackgroundChange = (name: string) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      settings: {
        ...prevCharacter.settings,
        wallpaper: name as Character["settings"]["wallpaper"],
      },
    }));
  };
  return (
    <div>
      <div className="inline-grid gap-2 grid-cols-1 justify-items-center">
        {itemData.map((item) => (
          <button
            key={item.title}
            className={`rounded border-2 border-solid w-full ${
              item.className === character.settings.wallpaper
                ? "border-amber"
                : "border-darkGray"
            }`}
            onClick={() => handleBackgroundChange(item.className || "")}
          >
            {item.img ? (
              <Image
                className="rounded"
                src={item.img}
                alt={item.title}
                width={200}
                height={200}
              />
            ) : (
              <div className="border border-solid rounded border-white p-4 ">
                Blank
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsBackground;
