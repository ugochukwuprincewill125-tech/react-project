const paths = {
  laptop: 'M4 5h16v10H4z M2 18h20 M9 5V3h6v2',
  phone: 'M8 3h8v18H8z M11 18h2',
  router: 'M4 14h16v6H4z M8 14V9l4-4 4 4v5 M12 17h.01',
  drive: 'M5 5h14l2 6v8H3V11z M7 17h.01 M11 17h.01',
  headset: 'M4 13a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-1v-6h3 M4 18v-5h3v6H5a1 1 0 0 1-1-1z',
  camera: 'M4 8h3l2-3h6l2 3h3v11H4z M12 13.5a3 3 0 1 0 0-.01',
  power: 'M13 2 4 13h6l-1 9 9-11h-6z',
  gamepad: 'M6 9h12l2 9a2 2 0 0 1-3.6 1.2L15 17H9l-1.4 2.2A2 2 0 0 1 4 18z M9 12v3 M7.5 13.5h3 M16.5 12h.01 M18.5 14h.01',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4',
  office: 'M4 21V6l8-3 8 3v15 M9 21v-6h6v6 M9 10h.01 M12 10h.01 M15 10h.01',
};

function Icon({ name, size = 22 }) {
  const d = paths[name] || paths.laptop;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default Icon;
