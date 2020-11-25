export const breakPoints = {
  PHONE: 540,
  TABLET: 768,
  DESKTOP: 1024,
  LARGEDESKTOP: 1280,
  HD: 1536
}

export const mediaHelper = () => {
  const mqTemplate = (
    breakPoint: number,
    css: string
  ) => `@media (min-width:${breakPoint}px){
     ${css}
  }`
  const resolveMedia = () => {
    return {
      phone: mqTemplate.bind(null, breakPoints.PHONE),
      tablet: mqTemplate.bind(null, breakPoints.TABLET),
      desktop: mqTemplate.bind(null, breakPoints.DESKTOP),
      lageDesktop: mqTemplate.bind(null, breakPoints.LARGEDESKTOP),
      hd: mqTemplate.bind(null, breakPoints.HD)
    }
  }
  return resolveMedia()
}
