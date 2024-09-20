// store.js

type Store = {
  [key: string]: any;
};

// 创建一个简单的内存存储
const store: Store = {};

// 设置缓存
export const setCache = (key: string, value: any) => {
  store[key] = {
    value,
    timestamp: Date.now(), // 设置时间戳
  };
};

// 获取缓存
export const getCache = (key: string, maxAge: number = 1000 * 60 * 15) => {
  const cache = store[key];

  // 如果缓存存在且未过期，返回缓存值
  if (cache && Date.now() - cache.timestamp < maxAge) {
    return cache.value;
  }

  // 如果缓存不存在或已过期，返回 null
  return null;
};

// 删除缓存
export const clearCache = (key: string) => {
  delete store[key];
};
