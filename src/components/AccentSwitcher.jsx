import { useState, useEffect } from 'react';

const accentColors = [
  { name: 'green', value: '#00ff41', label: 'GREEN' },
  { name: 'amber', value: '#ffb000', label: 'AMBER' },
  { name: 'red', value: '#ff0040', label: 'RED' },
];

export default function AccentSwitcher() {
  const [accentColor, setAccentColor] = useState(() => {
    const saved = localStorage.getItem('accentColor');
    return saved || 'green';
  });

  useEffect(() => {
    const color = accentColors.find(c => c.name === accentColor);
    if (color) {
      document.documentElement.style.setProperty('--accent-color', color.value);
      localStorage.setItem('accentColor', accentColor);
    }
  }, [accentColor]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-wider opacity-80 mr-2">COLOR:</span>
      <div className="flex gap-2">
        {accentColors.map((color) => (
          <button
            key={color.name}
            onClick={() => setAccentColor(color.name)}
            className={`px-4 py-2 retro-border text-xs uppercase tracking-wider font-bold transition-all ${
              accentColor === color.name
                ? 'bg-[var(--accent-color)] text-black retro-glow-strong'
                : 'bg-black hover:bg-[var(--accent-color)]/20'
            }`}
            style={
              accentColor === color.name
                ? {}
                : { 
                    borderColor: color.value,
                    color: color.value
                  }
            }
            aria-label={`Switch to ${color.label} color`}
          >
            {color.label}
          </button>
        ))}
      </div>
    </div>
  );
}
