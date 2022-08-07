let a = 0;

// 非同期処理(Promise)
new Promise((resolve, reject) => {
  setTimeout(() => {
    a = 1;
    resolve(a);
  }, 2000);
}).then((b) => {
  console.log(b); // 1 (2秒後)
  return b;
}).then((b) => {
  console.log(b); // 1
}).catch((c) => {
  console.log('catchが実行', c); // catchが実行 1
});
