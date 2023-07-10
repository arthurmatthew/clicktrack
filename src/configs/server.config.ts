/**
 * Object containing useful configs for anything related to communicating with the backend.
 */
const server = {
  url: 'http://localhost:3000/', // URL to send requests to
  at: (route: string) => {
    // Helper to build full URL out of route
    return server.url + route;
  },
};

export default server;
