function print(callback) {
  console.log(callback); // fnの関数が渡ってきている
  const result = callback(2); // fn関数を実行して resultに代入(fn関数の呼び出し元になる) number * 2　が返ってくる
  console.log(result); // 4
}

function fn(number = 3) {
  return number * 2;
}

// debugger;
print(fn);
