const formatTransfersCount = (stops: string[]) => {
  const transfersCount = Number(stops.join('').length / 3);
  let visibleString;
  if (transfersCount === 1) {
    visibleString = `${transfersCount} ПЕРЕСАДКА`;
  }
  if (transfersCount > 1 && transfersCount <= 4) {
    visibleString = `${transfersCount} ПЕРЕСАДКИ`;
  }
  if (transfersCount === 0 || transfersCount > 4) {
    visibleString = `${transfersCount} ПЕРЕСАДОК`;
  }
  return visibleString;
};

export default formatTransfersCount;
