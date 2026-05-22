import { ImageResponse } from 'next/og';

export const alt = 'GhostDock — turn any GitHub repo into a landing page';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '80px',
        backgroundColor: '#010a06',
        fontFamily: 'sans-serif',
      }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <svg width="46" height="46" viewBox="0 0 32 32" style={{ marginRight: '18px' }}>
          <g
            fill="none"
            stroke="#00c47a"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="16" cy="7" r="3" />
            <line x1="16" y1="10" x2="16" y2="25" />
            <line x1="10" y1="13" x2="22" y2="13" />
            <path d="M6 17.5 C 6 24 10 27 16 27 C 22 27 26 24 26 17.5" />
          </g>
        </svg>
        <div style={{ display: 'flex', fontSize: 32, fontWeight: 600, color: '#f5f9f5' }}>
          GhostDock
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontSize: 92,
            fontWeight: 700,
            color: '#f5f9f5',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
          }}>
          Turn any repo into a landing page.
        </div>
        <div style={{ display: 'flex', fontSize: 34, color: '#c8d0cc', marginTop: 32 }}>
          Paste a public GitHub repo URL — no config, no AI.
        </div>
      </div>
      <div style={{ display: 'flex', fontSize: 26, color: '#00c47a' }}>ghostdock.vercel.app</div>
    </div>,
    { ...size },
  );
}

export default OpengraphImage;
