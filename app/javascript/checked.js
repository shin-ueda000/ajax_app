function check() {　
  const posts = document.querySelectorAll(".post")　  //querySelectorAllでpostというクラス名を全て取得して、変数に代入
  posts.forEach(function(post) {                      //繰り返し処理
    if (post.getAttribute("data-load") != null) {　　　//
      return null;
    }
    post.setAttribute("data-load", "true");　　　　　　//post.setAttributeでdata-load属性にtrue属性を追加

    post.addEventListener("click", () => {         //addEventListenerメソッドでclickをした時のイベント作成
      const postId = post.getAttribute("data-id");　//getAttributeでデータのaidを取得し、postidに代入
      const XHR = new XMLHttpRequest();　　　　　　　//非同期通信開始
      XHR.open("GET", `/posts/${postId}`, true);   //オープンメソッド
      XHR.responseType = "json";      //レスポンスのデータの形式の指定
      XHR.send();　　　　　　　//リクエストの送信
      XHR.onload = () => {   //リクエストの送信が成功した場合に呼び出される
        if (XHR.status != 200) {　　　　//ステータスが200じゃない時に実行
          alert(`Error ${XHR.status}: ${XHR.statusText}`);　　//エラー文表示
          return null;　　　　　　　　　　　// 処理を抜ける
        }
        const item = XHR.response.post;  //コントローラーで定義され、書き換えられた、postを代入
        if (item.checked === true) {　　　　　　
          post.setAttribute("data-check", "true");　//チェックが入ったメモにcssを適応させる
        } else if (item.checked === false) {　　　　　//チェックが入っていない時にcssを消す
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);
window.addEventListener("load", check)




// メモをクリック→JSが気づく→post.addEventListener("click",→　JSがサーバーにリクエスト　                          →ルーティング　→コントローラ　→レスポンス（JSON）　　　　　　　→JSがレスポンスを受け取る　→HTMLを操作する
// ブラウザをユーザーが操作する　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　→ルーティング　→コントローラ　→レスポンス（HTML）　　　　　　　→ブラウザでHTMLを表示: