type AnalyticsEvent =
  | "signup_click"
  | "account_created"
  | "job_created"
  | "checklist_item_completed"
  | "county_template_created"
  | "checkout_started"
  | "subscription_activated";

export function trackEvent(event: AnalyticsEvent, properties: Record<string, unknown> = {}) {
  if (typeof window === "undefined") {
    console.log("[analytics]", event, properties);
    return;
  }
  window.dispatchEvent(new CustomEvent("septicpermitcrm:analytics", { detail: { event, properties } }));
}
