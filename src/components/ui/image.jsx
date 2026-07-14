import * as React from "react"

const FALLBACK_IMAGE_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f1f1f1'/%3E%3C/svg%3E"

/**
 * Componente simples de imagem com fallback para quando a URL falha ou
 * está vazia. Sem dependência de nenhum CDN/plataforma específica —
 * funciona com qualquer URL (Supabase Storage, link externo, etc).
 */
const Image = React.forwardRef(({ src, ...props }, ref) => {
  const [imgSrc, setImgSrc] = React.useState(src)

  React.useEffect(() => {
    setImgSrc(src)
  }, [src])

  return (
    <img
      ref={ref}
      src={imgSrc || FALLBACK_IMAGE_URL}
      onError={() => setImgSrc(FALLBACK_IMAGE_URL)}
      {...props}
    />
  )
})
Image.displayName = "Image"

export { Image }
