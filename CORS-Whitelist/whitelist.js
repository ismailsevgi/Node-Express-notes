const whitelist = {
  myWebsite: 'www.mywebsite.com',
  myLocalHost: 'http://127.0.0.1:3500',
  myLocalHost2: 'http://localhost:3500',
};

module.exports = [...Object.values(whitelist)];
