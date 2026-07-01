import {
  AtIcon,
  CodepenLogoIcon,
  CodeSimpleIcon,
  DatabaseIcon,
  FileTextIcon,
  GithubLogoIcon,
  LayoutIcon,
  LinkedinLogoIcon,
  PlayIcon,
  StorefrontIcon,
  TerminalWindowIcon,
  YoutubeLogoIcon
} from '@phosphor-icons/react/dist/ssr';
import type { Icon } from '@phosphor-icons/react/lib';

export const getPhosphorIcon: Record<string, Icon> = {
  'at': AtIcon,
  'code-simple': CodeSimpleIcon,
  'codepen-logo': CodepenLogoIcon,
  'database': DatabaseIcon,
  'file-text': FileTextIcon,
  'github-logo': GithubLogoIcon,
  'layout': LayoutIcon,
  'linkedin-logo': LinkedinLogoIcon,
  'play': PlayIcon,
  'storefront': StorefrontIcon,
  'terminal-window': TerminalWindowIcon,
  'youtube-logo': YoutubeLogoIcon
};
