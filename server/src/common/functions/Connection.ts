export const getConnectionUrl = (server: string, rest?: string) => {
  return "http://" + server + ":80/" + rest;
};
