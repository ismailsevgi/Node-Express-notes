const whitelist = {
  myWebsite: 'www.mywebsite.com',
  myLocalHost: 'http://127.0.0.1:3000',
  myLocalHost2: 'http://localhost:3000',
};

module.exports = [...Object.values(whitelist)];
