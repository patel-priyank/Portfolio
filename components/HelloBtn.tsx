'use client';

const HelloBtn = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button className="cursor-pointer text-xl rounded-sm" onClick={handleClick}>
      Hello!
    </button>
  );
};

export default HelloBtn;
