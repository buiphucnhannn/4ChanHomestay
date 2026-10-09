'use client';

import { useId } from 'react';

/*
 * Bộ công cụ "sóng đều": mọi đường cong trên trang đều sinh từ hàm sin
 * nên biên độ & chu kỳ luôn đồng đều, không bị méo tay.
 */

const round = (n) => Math.round(n * 1000) / 1000;

// Điểm trên một đường sóng ngang: y = base + amp * sin(2π * periods * t + phase)
function sineY(t, base, amp, periods, phase) {
  return base + amp * Math.sin(2 * Math.PI * periods * t + phase);
}

/**
 * Path SVG cho dải sóng ngang (dùng làm divider giữa các section).
 * Tọa độ: width x height, sóng nằm quanh `base`, phần tô là phía dưới sóng.
 */
export function waveBandPath({ width = 1440, height = 120, base = 60, amp = 18, periods = 1.5, phase = 0, steps = 96, overshoot = 0 }) {
  const x0 = -overshoot;
  const x1 = width + overshoot;
  const bottom = height + overshoot;
  let d = `M${x0},${bottom} L${x0},${round(sineY(0, base, amp, periods, phase))}`;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    d += ` L${round(t * width)},${round(sineY(t, base, amp, periods, phase))}`;
  }
  return `${d} L${x1},${round(sineY(1, base, amp, periods, phase))} L${x1},${bottom} Z`;
}

/**
 * Divider sóng nhiều lớp. Các lớp dùng chung chu kỳ, chỉ lệch pha & độ cao
 * → nhìn mềm mại, hài hòa như mẫu.
 * layers: [{ color, base, amp, phase, periods, opacity, blur }] — blur > 0 biến lớp đó thành quầng sáng mềm
 */
export function WaveDivider({ layers, height = 110, periods = 1.5, flip = false, className = '' }) {
  const uid = useId().replace(/:/g, '');
  return (
    <div aria-hidden className={`pointer-events-none absolute left-0 right-0 w-full leading-none ${className}`}>
      <svg
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        className={`block w-full ${flip ? 'rotate-180' : ''}`}
        style={{ height: `clamp(${Math.round(height * 0.45)}px, ${(height / 1440) * 100}vw, ${height}px)` }}
      >
        <defs>
          {layers.map((l, i) =>
            l.blur ? (
              <filter key={i} id={`wave-${uid}-${i}`} x="-5%" y="-50%" width="110%" height="200%">
                <feGaussianBlur stdDeviation={l.blur} />
              </filter>
            ) : null
          )}
        </defs>
        {layers.map((l, i) => (
          <path
            key={i}
            fill={l.color}
            opacity={l.opacity ?? 1}
            filter={l.blur ? `url(#wave-${uid}-${i})` : undefined}
            d={waveBandPath({ height, base: l.base, amp: l.amp, periods: l.periods ?? periods, phase: l.phase ?? 0, overshoot: l.blur ? 40 : 0 })}
          />
        ))}
      </svg>
    </div>
  );
}

/*
 * Khung ảnh có cạnh lượn sóng (clipPath theo objectBoundingBox 0..1).
 * edges: { left, right, top, bottom } mỗi cạnh = { amp, periods, phase, inset }
 */
function edgePoints(edge, cfg, steps = 48) {
  const { amp = 0.03, periods = 1, phase = 0, inset = amp } = cfg;
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const off = inset + amp * Math.sin(2 * Math.PI * periods * t + phase);
    if (edge === 'top') pts.push([t, off]);
    if (edge === 'right') pts.push([1 - off, t]);
    if (edge === 'bottom') pts.push([1 - t, 1 - off]);
    if (edge === 'left') pts.push([off, 1 - t]);
  }
  return pts;
}

const ORDER = ['top', 'right', 'bottom', 'left'];
const isVertical = (edge) => edge === 'left' || edge === 'right';

export function organicClipPath(edges = {}, cornerSteps = 7) {
  const straight = {
    top: [[0, 0], [1, 0]],
    right: [[1, 0], [1, 1]],
    bottom: [[1, 1], [0, 1]],
    left: [[0, 1], [0, 0]],
  };
  const segs = ORDER.map((e) => (edges[e] ? edgePoints(e, edges[e]) : straight[e]));

  // Hai cạnh sóng liền kề: cắt bớt đầu/cuối và nối bằng đường cong bậc 2
  // qua điểm giao → góc bo tròn, không bị nhọn hay chừa tam giác thừa.
  ORDER.forEach((e, i) => {
    const nextIdx = (i + 1) % 4;
    const next = ORDER[nextIdx];
    if (!edges[e] || !edges[next]) return;
    const a = segs[i], b = segs[nextIdx];
    const aEnd = a[a.length - 1], bStart = b[0];
    const corner = isVertical(e) ? [aEnd[0], bStart[1]] : [bStart[0], aEnd[1]];
    const p0 = a[a.length - 1 - cornerSteps];
    const p2 = b[cornerSteps];
    segs[i] = a.slice(0, a.length - cornerSteps);
    const arc = [];
    for (let s = 1; s < 12; s++) arc.push(quad(p0, corner, p2, s / 12));
    segs[i].push(...arc);
    segs[nextIdx] = b.slice(cornerSteps);
  });

  const pts = segs.flat();
  return 'M' + pts.map(([x, y]) => `${round(x)},${round(y)}`).join(' L') + ' Z';
}

export function OrganicFrame({ edges, className = '', children, style }) {
  const id = useId().replace(/:/g, '');
  return (
    <div className={className} style={{ ...style, clipPath: `url(#clip-${id})` }}>
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <clipPath id={`clip-${id}`} clipPathUnits="objectBoundingBox">
            <path d={organicClipPath(edges)} />
          </clipPath>
        </defs>
      </svg>
      {children}
    </div>
  );
}

/*
 * Cành lá vẽ tay: lá mọc so le đều nhau dọc theo một đường cong bậc 2.
 */
function quad(p0, p1, p2, t) {
  const a = (1 - t) * (1 - t), b = 2 * (1 - t) * t, c = t * t;
  return [a * p0[0] + b * p1[0] + c * p2[0], a * p0[1] + b * p1[1] + c * p2[1]];
}
function quadTangent(p0, p1, p2, t) {
  return [2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]), 2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1])];
}

export function Branch({
  className = '',
  leaves = 9,
  leafColor = '#9DAE8C',
  leafColor2 = '#B8C6A6',
  stem = '#8E9F80',
  flowers = 0,
  flowerColor = '#EBA77F',
  flip = false,
  style,
}) {
  const p0 = [20, 290], p1 = [40, 120], p2 = [150, 20];
  const items = [];
  for (let i = 1; i <= leaves; i++) {
    const t = 0.08 + (i / (leaves + 1)) * 0.88;
    const [x, y] = quad(p0, p1, p2, t);
    const [tx, ty] = quadTangent(p0, p1, p2, t);
    const ang = (Math.atan2(ty, tx) * 180) / Math.PI;
    const side = i % 2 === 0 ? 1 : -1;
    const size = 1 - t * 0.45;
    items.push(
      <g key={i} transform={`translate(${round(x)} ${round(y)}) rotate(${round(ang + side * 50)}) scale(${round(size)})`}>
        <path d="M0,0 C8,-9 26,-10 36,0 C26,10 8,9 0,0 Z" fill={i % 3 === 0 ? leafColor2 : leafColor} />
        <path d="M2,0 L30,0" stroke="#7F906F" strokeWidth="0.7" opacity="0.6" />
      </g>
    );
  }
  const blooms = [];
  for (let i = 0; i < flowers; i++) {
    const t = 0.35 + i * (0.6 / Math.max(flowers, 1));
    const [x, y] = quad(p0, p1, p2, t);
    const off = i % 2 === 0 ? 22 : -22;
    blooms.push(
      <g key={`f${i}`} transform={`translate(${round(x + off)} ${round(y - 6)})`}>
        <path d={`M0,0 L${-off * 0.8},6`} stroke={stem} strokeWidth="1" />
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="0" cy="-6" rx="4.6" ry="6.5" fill={flowerColor} opacity="0.9" transform={`rotate(${r})`} />
        ))}
        <circle r="3" fill="#D98A5F" />
      </g>
    );
  }
  return (
    <svg
      viewBox="0 0 170 300"
      fill="none"
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={{ ...style, transform: `${flip ? 'scaleX(-1)' : ''} ${style?.transform ?? ''}` }}
    >
      <path d={`M${p0} Q${p1} ${p2}`} stroke={stem} strokeWidth="1.6" strokeLinecap="round" />
      {items}
      {blooms}
    </svg>
  );
}

// Bông hoa nhỏ đứng riêng (hoa cam đào như mẫu)
export function Blossom({ className = '', color = '#EBA77F', style }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={`pointer-events-none ${className}`} style={style}>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="20" cy="11" rx="6.5" ry="9" fill={color} opacity="0.85" transform={`rotate(${r} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="4" fill="#D98A5F" />
    </svg>
  );
}

// Mèo nét vẽ tay (decor)
export function CatDoodle({ className = '' }) {
  return (
    <svg viewBox="0 0 80 60" fill="none" aria-hidden className={`pointer-events-none ${className}`}>
      <path
        d="M14 52 C10 36 14 22 20 14 L24 4 L31 13 C36 11 44 11 49 13 L56 4 L60 14 C66 22 70 36 66 52"
        stroke="#B9876C"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M31 30 q3 -3 6 0 M45 30 q3 -3 6 0" stroke="#B9876C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M38 37 l3 2 l3 -2 M41 39 v3 q-3 3 -6 1 M41 42 q3 3 6 1" stroke="#B9876C" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M24 37 h-10 M24 40 l-9 3 M58 37 h10 M58 40 l9 3" stroke="#B9876C" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

// Mèo nằm ngủ (nét vẽ tay) — đặt "ngồi" trên mép sóng
export function SleepyCat({ className = '' }) {
  return (
    <svg viewBox="0 0 130 64" fill="none" aria-hidden className={`pointer-events-none ${className}`}>
      <g stroke="#B9876C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {/* đầu + tai */}
        <path d="M16 54 C11 42 14 30 21 24 L19 12 L29 19 C33 17.5 37 17.5 41 19 L50 12 L49 24 C55 30 57 42 52 54" />
        {/* thân tròn kiểu "ổ bánh mì" */}
        <path d="M50 33 C64 26 92 26 106 36 C114 42 115 50 111 55 H14" />
        {/* đuôi cuộn ra trước */}
        <path d="M111 53 C121 53 124 44 117 41" />
        {/* mắt nhắm, mũi, ria */}
        <path d="M26 37 q3 2.6 6 0 M38 37 q3 2.6 6 0" />
        <path d="M33.5 42 l1.6 1.3 l1.6 -1.3" strokeWidth="1.3" />
        <path d="M24 44 h-9 M24 47 l-8 3 M46 44 h9 M46 47 l8 3" strokeWidth="1" />
        {/* chân trước */}
        <path d="M60 55 c0 -4 6 -4 6 0 M72 55 c0 -4 6 -4 6 0" strokeWidth="1.3" />
      </g>
      {/* z z */}
      <g fill="none" stroke="#C9A58E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M56 12 h6 l-6 7 h6" />
        <path d="M66 4 h4.5 l-4.5 5 h4.5" />
      </g>
    </svg>
  );
}

// Khóm lá mảnh (kiểu lá hẹ) mọc từ mặt đất, có một bông hoa nhỏ
export function GrassTuft({ className = '', flower = true, flip = false }) {
  return (
    <svg
      viewBox="0 0 60 72"
      fill="none"
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <g stroke="#9DAE8C" strokeWidth="2" strokeLinecap="round">
        <path d="M30 70 C28 52 22 36 10 24" />
        <path d="M30 70 C30 50 32 32 38 12" />
        <path d="M30 70 C33 56 42 44 55 38" />
        <path d="M30 70 C29 58 25 48 19 42" stroke="#B8C6A6" />
        <path d="M30 70 C31 58 36 48 44 26" stroke="#B8C6A6" />
      </g>
      {flower && (
        <g transform="translate(38 11)">
          {[0, 72, 144, 216, 288].map((r) => (
            <ellipse key={r} cx="0" cy="-4.5" rx="3.6" ry="5" fill="#EBA77F" opacity="0.9" transform={`rotate(${r})`} />
          ))}
          <circle r="2.2" fill="#D98A5F" />
        </g>
      )}
    </svg>
  );
}

// Dải dấu chân mèo, nhạt dần
export function PawTrail({ className = '', steps = 5 }) {
  const paws = Array.from({ length: steps }, (_, i) => ({
    x: 14 + i * 34,
    y: 30 + (i % 2 ? -9 : 9) - i * 2,
    o: 0.85 - i * 0.12,
  }));
  return (
    <svg viewBox={`0 0 ${steps * 34 + 20} 60`} aria-hidden className={`pointer-events-none ${className}`}>
      {paws.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${-14})`} fill="#C9A58E" opacity={p.o}>
          <ellipse cx="0" cy="3" rx="5" ry="4.2" />
          <circle cx="-5.2" cy="-3.5" r="1.9" />
          <circle cx="-1.8" cy="-6.2" r="1.9" />
          <circle cx="2" cy="-6.2" r="1.9" />
          <circle cx="5.4" cy="-3.5" r="1.9" />
        </g>
      ))}
    </svg>
  );
}

/*
 * Dải hoạ tiết lấp khoảng trống giữa các section (chỉ hiện từ laptop trở lên).
 * variant đổi vị trí để các dải không lặp lại giống hệt nhau.
 */
const DECOR_ROWS = {
  a: [
    ['grass', 'left-[3%] bottom-2 w-12', { flower: false }],
    ['grass', 'left-[5.8%] bottom-2 w-9', { flip: true }],
    ['blossom', 'left-[17%] bottom-10 w-5'],
    ['paw', 'left-[40%] bottom-4 w-[170px] -rotate-6'],
    ['blossom', 'left-[63%] bottom-8 w-6'],
    ['branch', 'right-[16%] bottom-2 w-16 -rotate-[62deg]'],
    ['grass', 'right-[4%] bottom-2 w-12', { flip: true }],
  ],
  b: [
    ['branch', 'left-[8%] bottom-2 w-16 rotate-[62deg]'],
    ['blossom', 'left-[26%] bottom-9 w-5'],
    ['grass', 'left-[46%] bottom-1 w-10', { flower: false }],
    ['cat', 'right-[24%] bottom-0 w-[64px]'],
    ['blossom', 'right-[34%] bottom-10 w-5'],
    ['grass', 'right-[6%] bottom-2 w-12'],
    ['grass', 'right-[3.5%] bottom-2 w-9', { flower: false, flip: true }],
  ],
};

export function DecorRow({ variant = 'a', className = '' }) {
  return (
    <div data-reveal="decor" data-reveal-delay="200" aria-hidden className={`hidden lg:block pointer-events-none absolute inset-x-0 bottom-0 h-28 ${className}`}>
      {DECOR_ROWS[variant].map(([kind, cls, opts = {}], i) => {
        const c = `absolute ${cls}`;
        if (kind === 'grass') return <GrassTuft key={i} className={c} {...opts} />;
        if (kind === 'blossom') return <Blossom key={i} className={`${c} opacity-70`} />;
        if (kind === 'paw') return <PawTrail key={i} className={`${c} opacity-70`} />;
        if (kind === 'cat') return <CatDoodle key={i} className={c} />;
        return <Branch key={i} className={`${c} opacity-90`} leaves={7} flowers={2} />;
      })}
    </div>
  );
}

// Mũi tên dùng chung cho nút
export function Arrow({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M4 10h11m-4-4.5L15.5 10 11 14.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
