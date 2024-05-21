export default function isObjectEmpty(object) {
  return object ? Object.keys(object).length === 0 : true;
}
