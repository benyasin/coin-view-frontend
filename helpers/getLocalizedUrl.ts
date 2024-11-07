export const getLocalizedUrl = (path: string, locale: string): string => {
  return locale === "zh"
    ? process.env.DOMAIN_BASE_URL +
        (path.startsWith("/zh") ? path : `/zh${path}`)
    : process.env.DOMAIN_BASE_URL + path;
};
