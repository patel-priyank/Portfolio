import { BracketsCurlyIcon, CalendarCheckIcon, MapPinIcon, StackIcon } from '@phosphor-icons/react/dist/ssr';

const highlights = [
  {
    icon: <BracketsCurlyIcon weight="bold" />,
    text: 'Full stack developer'
  },
  {
    icon: <StackIcon weight="bold" />,
    text: 'Builds end-to-end'
  },
  {
    icon: <CalendarCheckIcon weight="bold" />,
    text: '6 years of experience'
  },
  {
    icon: <MapPinIcon weight="bold" />,
    text: 'Based in the UK'
  }
];

const Hero = () => {
  return (
    <>
      {highlights.map((highlight, index) => (
        <div
          key={index}
          className="w-full flex flex-col gap-2 max-w-3xs sm:max-w-none bg-(--bg-alt) rounded-lg p-4 text-(--text-muted)"
        >
          {highlight.icon}
          <span className="text-sm truncate">{highlight.text}</span>
        </div>
      ))}
    </>
  );
};

export default Hero;
