'use client';
import { useEffect, useState } from 'react';
export default function CookieNotice() {
  const [show, setShow] = useState(false);
  useEffect(() => { try { if (!window.localStorage.getItem('maison-prisca-cookie-ok')) setShow(true); } catch { setShow(true); } }, []);
  if (!show) return null;
  const dismiss = () => { try { window.localStorage.setItem('maison-prisca-cookie-ok', '1'); } catch {} setShow(false); };
  return <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--line)] bg-[var(--white)] px-4 py-3 text-xs leading-5 text-[var(--muted)] sm:px-6">
    <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3">
      <p>This site uses Google Analytics to understand how visitors use it. No personal data is sold or shared.</p>
      <button onClick={dismiss} className="btn btn-dark shrink-0 !px-4 !py-2 text-xs">Got it</button>
    </div>
  </div>;
}
