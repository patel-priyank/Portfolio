'use client';

const ThatsAllFolksBtn = () => {
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const btnRect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX || btnRect.left + btnRect.width / 2;
    const y = e.clientY || btnRect.top + btnRect.height / 2;

    const { default: confetti } = await import('canvas-confetti');

    confetti({
      particleCount: 250,
      spread: 150,
      scalar: 0.75,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight }
    });
  };

  return (
    <button className="cursor-pointer rounded-xs text-xs text-center text-(--accent)" onClick={handleClick}>
      That’s all Folks!
    </button>
  );
};

export default ThatsAllFolksBtn;
