import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { params: urlParams } = params;
  const [width = 400, height = 300] = urlParams || [];
  
  // Validate dimensions
  const w = Math.min(Math.max(parseInt(width) || 400, 1), 2000);
  const h = Math.min(Math.max(parseInt(height) || 300, 1), 2000);
  
  // Create a simple SVG placeholder
  const svg = `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#9ca3af" text-anchor="middle" dy=".3em">
        ${w} × ${h}
      </text>
    </svg>
  `;
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
