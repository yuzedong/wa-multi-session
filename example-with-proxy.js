const { startSession } = require('./dist/index.js');

// 示例1：使用SOCKS5代理（默认）
async function startWithSocks5Proxy() {
  try {
    const session = await startSession('my-session-with-proxy', {
      printQR: true,
      enableProxy: true,
      proxy: {
        host: '127.0.0.1',
        port: 7891,
        type: 5 // SOCKS5 (默认)
      },
      onConnected: () => {
        console.log('WhatsApp connected successfully with SOCKS5 proxy!');
      },
      onDisconnected: () => {
        console.log('WhatsApp disconnected');
      }
    });
    
    console.log('Session started with SOCKS5 proxy');
    return session;
  } catch (error) {
    console.error('Failed to start session with proxy:', error);
  }
}

// 示例2：使用带认证的SOCKS5代理
async function startWithAuthenticatedProxy() {
  try {
    const session = await startSession('my-session-with-auth-proxy', {
      printQR: true,
      enableProxy: true,
      proxy: {
        host: '127.0.0.1',
        port: 7891,
        type: 5,
        username: 'your-username', // 如果代理需要认证
        password: 'your-password'
      },
      onConnected: () => {
        console.log('WhatsApp connected successfully with authenticated SOCKS5 proxy!');
      }
    });
    
    console.log('Session started with authenticated SOCKS5 proxy');
    return session;
  } catch (error) {
    console.error('Failed to start session with authenticated proxy:', error);
  }
}

// 示例3：不使用代理（默认行为）
async function startWithoutProxy() {
  try {
    const session = await startSession('my-session-no-proxy', {
      printQR: true,
      enableProxy: false, // 或者不设置这个选项
      onConnected: () => {
        console.log('WhatsApp connected successfully without proxy!');
      }
    });
    
    console.log('Session started without proxy');
    return session;
  } catch (error) {
    console.error('Failed to start session without proxy:', error);
  }
}

// 根据需要调用相应的函数
// startWithSocks5Proxy();
// startWithAuthenticatedProxy();
// startWithoutProxy();

module.exports = {
  startWithSocks5Proxy,
  startWithAuthenticatedProxy,
  startWithoutProxy
};