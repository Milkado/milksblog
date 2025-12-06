import { defineMiddleware } from "astro:middleware";
import { redirectToDefaultLocale } from "astro:i18n"; // function available with `manual` routing
export const onRequest = defineMiddleware(async (ctx, next) => {
  if (ctx.url.pathname.startsWith("/")) {
    return next();
  } else {
    return redirectToDefaultLocale(302);
  }
})
