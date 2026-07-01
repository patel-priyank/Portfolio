'use client';

import { useEffect, useRef } from 'react';

import { XIcon } from '@phosphor-icons/react/dist/ssr';

import { isDarkTheme } from '@/lib/themes';

import { useTheme } from '@/context/ThemeProvider';

const ThemeDialog = () => {
  const { themes, currentTheme, isOpen, close, setTheme } = useTheme();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleGridKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

    if (!keys.includes(event.key)) {
      return;
    }

    const grid = gridRef.current;

    if (!grid) {
      return;
    }

    event.preventDefault();

    const inputs = [...grid.querySelectorAll<HTMLInputElement>('input[type="radio"]')];
    const currentIndex = inputs.findIndex(input => input === document.activeElement);

    if (currentIndex === -1) {
      return;
    }

    const columns = getComputedStyle(grid).getPropertyValue('grid-template-columns').split(' ').length;
    const currentCol = currentIndex % columns;

    let nextIndex = currentIndex;

    if (event.key === 'ArrowDown') {
      nextIndex = currentIndex + columns;
    } else if (event.key === 'ArrowUp') {
      nextIndex = currentIndex - columns;
    } else if (event.key === 'ArrowRight' && currentCol < columns - 1) {
      nextIndex = currentIndex + 1;
    } else if (event.key === 'ArrowLeft' && currentCol > 0) {
      nextIndex = currentIndex - 1;
    }

    if (nextIndex >= 0 && nextIndex < inputs.length) {
      const next = inputs[nextIndex];

      next.focus();
      next.checked = true;
      setTheme(next.value, true);
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    const container = containerRef.current;

    if (!dialog || !container) {
      return;
    }

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        container.scrollTop = 0;
      }

      return;
    }

    if (!dialog.open) {
      return;
    }

    const transform = getComputedStyle(container).transform;
    const currentX = transform === 'none' ? 0 : parseFloat(transform.split(', ')[4]);
    const currentXPercent = (currentX / container.offsetWidth) * 100;

    dialog.classList.add('closing');
    container.style.setProperty('--slide-out-start', `${currentXPercent}%`);

    const handleAnimationEnd = () => {
      dialog.classList.remove('closing');
      dialog.close();
    };

    container.addEventListener('animationend', handleAnimationEnd, { once: true });

    return () => container.removeEventListener('animationend', handleAnimationEnd);
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClick={event => {
        if (event.target === dialogRef.current) {
          close();
        }
      }}
      onCancel={event => {
        event.preventDefault();
        close();
      }}
      className="theme-dialog z-1050"
    >
      <div
        ref={containerRef}
        className="themes-container overflow-auto fixed left-auto right-0 w-full max-w-sm h-full bg-(--bg) bg-center bg-fixed bg-size-[32px_32px] bg-[linear-gradient(to_right,var(--bg-alt)_1px,transparent_1px),linear-gradient(to_bottom,var(--bg-alt)_1px,transparent_1px)] text-(--text)"
      >
        <div className="sticky top-0 z-1100 bg-(--bg-alt) border-b-4 border-(--bg)">
          <div className="p-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Theme</h2>

            <button
              onClick={close}
              className="cursor-pointer flex gap-2 items-center p-2 border border-(--accent) rounded-md select-none bg-(--bg-alt) text-(--accent) pointer-fine:hover:bg-(--accent) pointer-fine:hover:text-(--bg-alt) transition-[background-color,color]"
            >
              <XIcon weight="bold" />
            </button>
          </div>
        </div>

        <div ref={gridRef} onKeyDown={handleGridKeyDown} className="grid grid-cols-2 gap-4 p-4">
          {themes.map((theme, index) => (
            <label
              key={index}
              className="cursor-pointer bg-(--bg-alt) text-(--accent) rounded-lg flex flex-col gap-3 items-start justify-end h-34 p-4 border border-(--accent) pointer-fine:hover:bg-(--accent) pointer-fine:hover:text-(--bg-alt) transition-[background-color,color] relative"
            >
              <input
                type="radio"
                name="theme"
                value={theme.name}
                checked={currentTheme === theme.name}
                onChange={() => setTheme(theme.name, true)}
                className="absolute opacity-0"
              />

              <div className="flex gap-1">
                <div
                  className="rounded-full w-6 h-6 shadow-[0_0_0_1px_var(--text)]"
                  style={{ backgroundColor: theme.accent }}
                />

                <div
                  className="rounded-full w-10 h-6 shadow-[0_0_0_1px_var(--text)]"
                  style={{
                    backgroundColor: `hsl(from ${theme.bg} h s calc(l * ${isDarkTheme(theme.bg) ? 3.25 : 0.85}))`
                  }}
                />
              </div>

              <span className="truncate select-none">{theme.name}</span>
            </label>
          ))}
        </div>
      </div>
    </dialog>
  );
};

export default ThemeDialog;
