import { useEffect, useRef } from "react";
import { publicApi } from "@/lib/admin-api";

function getDeviceType(): string {
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("OPR") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  return "Other";
}

function getOS(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac")) return "macOS";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  return "Other";
}

function getTrafficSource(): string {
  const ref = document.referrer.toLowerCase();
  if (!ref) return "direct";
  if (ref.includes("google")) return "google";
  if (ref.includes("linkedin")) return "linkedin";
  if (ref.includes("facebook") || ref.includes("fb.com")) return "facebook";
  if (ref.includes("twitter") || ref.includes("t.co")) return "twitter";
  if (ref.includes("instagram")) return "instagram";
  return "referral";
}

function getSessionId(): string {
  let id = sessionStorage.getItem("skyrich_session_id");
  if (!id) {
    id = "s_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem("skyrich_session_id", id);
  }
  return id;
}

export default function VisitorTracker() {
  const pageStartTime = useRef(Date.now());
  const lastPageUrl = useRef("");

  useEffect(() => {
    const consent = localStorage.getItem("skyrich_cookie_consent");
    if (consent === "rejected") return;

    const sessionId = getSessionId();
    const params = new URLSearchParams(window.location.search);

    publicApi.trackAnalytics({
      sessionId,
      pageUrl: window.location.pathname,
      pageTitle: document.title,
      deviceType: getDeviceType(),
      browser: getBrowser(),
      os: getOS(),
      screenResolution: `${screen.width}x${screen.height}`,
      referrer: document.referrer,
      trafficSource: getTrafficSource(),
      utmSource: params.get("utm_source"),
      utmMedium: params.get("utm_medium"),
      utmCampaign: params.get("utm_campaign"),
    });

    lastPageUrl.current = window.location.pathname;
    pageStartTime.current = Date.now();

    const trackTime = () => {
      if (lastPageUrl.current) {
        const timeSpent = Math.round((Date.now() - pageStartTime.current) / 1000);
        if (timeSpent > 1) {
          publicApi.trackPageTime({
            sessionId: getSessionId(),
            pageUrl: lastPageUrl.current,
            timeSpent,
          });
        }
      }
    };

    const handleVisibilityChange = () => { if (document.hidden) trackTime(); else { pageStartTime.current = Date.now(); } };
    const handleBeforeUnload = () => trackTime();

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      trackTime();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const consent = localStorage.getItem("skyrich_cookie_consent");
    if (consent === "rejected") return;

    const currentUrl = window.location.pathname;
    if (currentUrl !== lastPageUrl.current) {
      if (lastPageUrl.current) {
        const timeSpent = Math.round((Date.now() - pageStartTime.current) / 1000);
        if (timeSpent > 1) {
          publicApi.trackPageTime({
            sessionId: getSessionId(),
            pageUrl: lastPageUrl.current,
            timeSpent,
          });
        }
      }

      const sessionId = getSessionId();
      publicApi.trackAnalytics({
        sessionId,
        pageUrl: currentUrl,
        pageTitle: document.title,
      });

      lastPageUrl.current = currentUrl;
      pageStartTime.current = Date.now();
    }
  });

  return null;
}
