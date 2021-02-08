module.exports = {
  root: "client",
  mount: {   
    public: "/", 
    client: "/",
  },
  plugins: [
    "@snowpack/plugin-react-refresh",
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-typescript",
  ],
  devOptions: {
    port: 5000    
  },
};
