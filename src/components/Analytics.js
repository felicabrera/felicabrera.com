"use client";

import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { GA_MEASUREMENT_ID, event as gtagEvent } from '@/lib/gtag';
import { usePathname } from 'next/navigation';

export default function Analytics() {
  const pathname = usePathname();
  const sentScroll = useRef({ 25: false, 50: false, 75: false, 100: false });

  // send a page_view on route change
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', { page_path: pathname });
    }
  }, [pathname]);

  useEffect(() => {
    const isExternal = (href) => {
      try {
        if (!href) return false;
        const url = new URL(href, location.href);
        return url.origin !== location.origin;
      } catch (e) {
        return false;
      }
    };

    const getLabel = (el) => {
      return (
        el.dataset?.ga ||
        el.getAttribute('aria-label') ||
        el.getAttribute('title') ||
        (el.textContent || '').trim().slice(0, 200)
      );
    };

    const clickHandler = (e) => {
      const el = e.target.closest('a,button,input,[role="button"],[data-ga]');
      if (!el) return;

      const tag = el.tagName.toLowerCase();
      const classes = el.className || '';
      const id = el.id || '';
      const label = getLabel(el) || undefined;

      if (tag === 'a') {
        const href = el.getAttribute('href') || el.href || '';
        const isMail = href.startsWith('mailto:');
        const isTel = href.startsWith('tel:');
        const isDownload = /\.(pdf|zip|docx?|xlsx?|csv|png|jpe?g|svg|mp3|mp4)$/i.test(href.split('?')[0].split('#')[0]);

        if (isMail) {
          gtagEvent({ action: 'click_mailto', category: 'engagement', label: label || href });
        } else if (isTel) {
          gtagEvent({ action: 'click_tel', category: 'engagement', label: label || href });
        } else if (isDownload) {
          gtagEvent({ action: 'file_download', category: 'engagement', label: label || href, file_url: href });
        } else if (isExternal(href)) {
          gtagEvent({ action: 'click_outbound', category: 'engagement', label: label || href, link_url: href });
        } else {
          gtagEvent({ action: 'click', category: 'engagement', label: label || href, element: tag, id, classes });
        }
      } else {
        // Buttons and other interactive elements
        gtagEvent({ action: 'click', category: 'engagement', label, element: tag, id, classes });
      }
    };

    const submitHandler = (e) => {
      const form = e.target;
      const id = form.id || '';
      const name = form.name || '';
      gtagEvent({ action: 'form_submit', category: 'engagement', label: name || id || undefined });
    };

    const copyHandler = (e) => {
      const text = (document.getSelection && document.getSelection().toString && document.getSelection().toString()) || '';
      gtagEvent({ action: 'copy', category: 'engagement', label: undefined, length: text.length });
    };

    let lastScrollPercent = 0;
    const scrollHandler = () => {
      const scrolled = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      if (isFinite(scrolled)) {
        [25, 50, 75, 100].forEach((threshold) => {
          if (scrolled >= threshold && !sentScroll.current[threshold]) {
            sentScroll.current[threshold] = true;
            gtagEvent({ action: 'scroll', category: 'engagement', label: `${threshold}%` });
          }
        });
        lastScrollPercent = scrolled;
      }
    };

    const visibilityHandler = () => {
      if (document.visibilityState === 'hidden') {
        gtagEvent({ action: 'page_hidden', category: 'engagement' });
      }
    };

    document.addEventListener('click', clickHandler, { passive: true });
    document.addEventListener('submit', submitHandler, { passive: true });
    document.addEventListener('copy', copyHandler, { passive: true });
    document.addEventListener('visibilitychange', visibilityHandler);
    window.addEventListener('scroll', scrollHandler, { passive: true });

    // cleanup
    return () => {
      document.removeEventListener('click', clickHandler);
      document.removeEventListener('submit', submitHandler);
      document.removeEventListener('copy', copyHandler);
      document.removeEventListener('visibilitychange', visibilityHandler);
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  );
}
