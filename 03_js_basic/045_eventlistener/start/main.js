const h1Element = document.querySelector('h1');
// console.log(h1Element); // <h1>開始時点コード</h1>
console.dir(h1Element); // h1 オブジェクトのプロパティが見れる
console.log(h1Element.textContent); // 開始時点コード
h1Element.textContent = '変更後のタイトル';

const btnEl = document.querySelector('button');
const helloFn = (e) => {
  console.dir(e.target.textContent);
  console.log('hello')
}
btnEl.addEventListener('click', helloFn);
