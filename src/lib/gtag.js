export const GA_MEASUREMENT_ID = 'G-E3KM9FQH0B';

// Simple wrappers to use in client code
export const pageview = (url) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', { page_path: url });
};

export const event = ({ action, category, label, value, ...rest } = {}) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  const params = {
    event_category: category || undefined,
    event_label: label || undefined,
    value: value || undefined,
    ...rest,
  };
  window.gtag('event', action || 'interaction', params);
};
