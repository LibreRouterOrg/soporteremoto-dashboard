export const makePasswd = () => {
  let passwd = "";
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 1; i < 8; i++) {
    var c = Math.floor(Math.random() * chars.length + 1);
    passwd += chars.charAt(c);
  }
  return passwd;
};
