const formatDuration = (duration: number) => {
  const hours: number | string = Math.floor(duration / 60);
  const minutes: number | string = duration % 60;
  return `${hours}ч ${minutes}м`;
};

export default formatDuration;
