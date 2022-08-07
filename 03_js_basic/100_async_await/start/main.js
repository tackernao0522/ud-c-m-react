// 非同期処理（Promise）
let a = 0;

init(); // catchが実行 1
async function init() {
    try {
        const result = await new Promise((resolve, reject) => {
            setTimeout(() => {
                a = 1;
                reject(a)
            }, 2000);
        })
        console.log(result);
    } catch (e) {
        console.log('catchが実行', e); // catchが実行 1
    }
}
