const paths = {
  home: <><path d="m3 11 9-8 9 8M5 10v11h14V10"/><path d="m13 9-4 6h4l-2 5 5-7h-4z"/></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>,
  board: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7v4m4-4v4m4-4v4M8 15h8m-8 3h5"/></>,
  tool: <path d="M14 4a6 6 0 0 0-7 8L2 17a3 3 0 0 0 5 5l5-5a6 6 0 0 0 8-7l-4 4-4-4 4-4z"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  shield: <><path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6z"/><path d="m8 12 3 3 5-6"/></>,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6"/>,
  chat: <><path d="M21 11a9 9 0 0 1-13 8l-5 2 1-5a9 9 0 1 1 17-5Z"/><path d="M8 8c0 4 2 6 6 7l2-2-3-1-1 1-2-3 1-1-2-2z"/></>,
};
export default function Icon({ name, ...props }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.check}</svg>; }
