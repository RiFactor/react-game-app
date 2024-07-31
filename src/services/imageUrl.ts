const getCroppedImageUrl = (url: string) => {
  // optimise / crop images for game list loading time
  if (url === null) return;
  const target = "media/";
  const index = url.indexOf(target) + target.length;

  return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};

export default getCroppedImageUrl;
