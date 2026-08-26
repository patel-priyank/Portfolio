import Link from 'next/link';

import NavHeightSetter from './NavHeightSetter';
import ThemeBtn from './ThemeBtn';
import ThemeToast from './ThemeToast';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-1000 bg-(--bg-alt) border-b-4 border-(--bg)">
      <NavHeightSetter />

      <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
        <Link href="/" aria-label="Scroll to top" className="cursor-pointer text-xl rounded-sm">
          Hello!
        </Link>

        <div className="relative">
          <ThemeBtn />
          <ThemeToast />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
