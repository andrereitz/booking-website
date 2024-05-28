export const ImageCover = ({
  url
} : {
  url: string
}) => {
  return <img src={url} className="object-cover rounded-md w-full h-full" />
}