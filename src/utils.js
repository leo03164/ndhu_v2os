export function timestampToDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  return `${year}-${month}-${day}`;
}

export function getShoesIdByAttribute(SN, name, company) {
  const shoesAttributeString = `${SN}${name}${company}`;
  const shoesId = web3.utils.keccak256(shoesAttributeString);
  return shoesId;
}