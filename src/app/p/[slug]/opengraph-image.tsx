import { eq } from 'drizzle-orm';
import { ImageResponse } from 'next/og';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';

export const alt = 'Project landing page on GhostDock';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await db.query.projects.findFirst({ where: eq(projects.slug, slug) });

  const name = project?.nameOverride ?? project?.repoName ?? 'GhostDock';
  const description = (project?.descriptionOverride ?? project?.descriptionParsed ?? '').slice(
    0,
    140,
  );
  const tech = (project?.techStackOverride ?? project?.techStackParsed ?? []).slice(0, 6);

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '80px',
        backgroundColor: '#fbfbfc',
        fontFamily: 'sans-serif',
      }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            color: '#15151c',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
          }}>
          {name}
        </div>
        {description && (
          <div style={{ display: 'flex', fontSize: 34, color: '#56565f', marginTop: 28 }}>
            {description}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', fontSize: 24, color: '#85858f' }}>{tech.join(' · ')}</div>
        <div style={{ display: 'flex', fontSize: 24, color: '#56565f' }}>
          Hoisted by GhostDock ⚓
        </div>
      </div>
    </div>,
    { ...size },
  );
}

export default OpengraphImage;
