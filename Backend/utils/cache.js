// utils/cache.js

const cache = {};

const setCache = (key, data, ttl = 300000) => {
  const expiry = Date.now() + ttl; // default: 5 minutes
  cache[key] = { data, expiry };
};

const getCache = (key) => {
  const cached = cache[key];
  if (!cached) return null;
  if (Date.now() > cached.expiry) {
    delete cache[key];
    return null;
  }
  return cached.data;
};

module.exports = { setCache, getCache };
