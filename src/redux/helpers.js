export function actionCreator(type) {
  return (payload = {}) => ({ type, payload });
}
