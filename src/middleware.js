import { defineMiddleware } from "astro:middleware";

const locales = ["en", "pt-br"];
const defaultLocale = "en";

export const onRequest = defineMiddleware((context, next) => {
  const { url, cookies, request, redirect } = context;
  const pathname = url.pathname;

  // Exit early if it's not a page
  if (pathname.includes(".")) {
    return next();
  }

  // Determine the current locale from the URL path
  let currentLocale = defaultLocale;
  const localeFromPath = pathname.split('/')[2]; // /milksblog/pt-br -> pt-br
  if (locales.includes(localeFromPath)) {
    currentLocale = localeFromPath;
  }

  // Store the current locale in a cookie
  cookies.set("locale", currentLocale, { path: "/" });

  // Only perform auto-redirection from the base path
  if (pathname === "/milksblog" || pathname === "/milksblog/") {
    // Check for a previously set locale cookie
    const localeCookie = cookies.get("locale")?.value;
    if (localeCookie && localeCookie !== defaultLocale) {
      return redirect(`/milksblog/${localeCookie}`);
    }

    // If no cookie, check browser language for new visitors
    const languages = request.headers.get("accept-language")?.split(",") || [];
    for (const lang of languages) {
      const langCode = lang.split(";")[0].trim();
      if (locales.includes(langCode) && langCode !== defaultLocale) {
        cookies.set("locale", langCode, { path: "/" });
        return redirect(`/milksblog/${langCode}`);
      }
    }
  }

  return next();
});
