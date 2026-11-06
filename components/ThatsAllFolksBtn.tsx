'use client';

import { useTheme } from '@/context/ThemeProvider';

const ThatsAllFolksBtn = () => {
  const { themes, currentThemeName } = useTheme();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const btnRect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX || btnRect.left + btnRect.width / 2;
    const y = e.clientY || btnRect.top + btnRect.height / 2;

    const { default: confetti } = await import('canvas-confetti');

    const theme = themes.find(t => t.name === currentThemeName);
    const particleCount = Math.random() * 100 + 150;
    const confettiOptions = {
      spread: Math.random() * 90 + 180,
      startVelocity: Math.random() * 10 + 25,
      ticks: 320,
      drift: Math.random() * 3 - 1.5,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      colors: theme && [theme.accent, theme.text_muted]
    };

    if (!theme?.pattern_path_data) {
      confetti({ ...confettiOptions, particleCount, scalar: 1 });
      return;
    }

    confetti({
      ...confettiOptions,
      particleCount: particleCount * 0.75,
      scalar: 1.5,
      shapes: [confetti.shapeFromPath(theme.pattern_path_data)]
    });

    confetti({
      ...confettiOptions,
      particleCount: particleCount * 0.25,
      scalar: 1
    });
  };

  return (
    <button
      data-reveal
      className="cursor-pointer rounded-xs text-sm font-medium text-center text-(--accent) hover:underline"
      onClick={handleClick}
    >
      That’s all Folks!
    </button>
  );
};

export default ThatsAllFolksBtn;
