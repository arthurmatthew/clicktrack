const server = {
  url: 'http://localhost:3000/',
  at: (route: string) => {
    return server.url + route;
  },
};

export default server;
