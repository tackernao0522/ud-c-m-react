import funcB, { hello, User } from "./module.js"; // funcBの部分は好きな名前に変更できる(default exportの場合)

hello(); // hello!
const user = new User('Takaki');
user.hello(); // Takaki
funcB(); // funcB output
