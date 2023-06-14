const server = {
  url: 'http://localhost:3000/',
  at: (route: string) => {
    return 'http://localhost:3000/' + route;
  },
};

export default server;
