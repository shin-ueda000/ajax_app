function memo(){
  const submit = document.getElementById("submit");  //htmlのid:submitからデータを取得し、変数に代入
  submit.addEventListener("click", (e) => {          // クリックしたときのイベント作成
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();          //非同期通信開始
    XHR.open("POST", "/posts", true);  //リクエストの内容を指定
    XHR.responseType = "json";　　//リクエストのデータ形式の指定
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
    const item = XHR.response.post;
    console.log(item)
    const list = document.getElementById("list");
    const formText = document.getElementById("content");
    const HTML = `
       <div class="post" data-id=${item.id}>
         <div class="post-date">
           投稿日時：${item.created_at}
         </div>
         <div class="post-content">
         ${item.content}
         </div>
       </div>`;
    list.insertAdjacentHTML("afterend", HTML);
    formText.value = "";
   };
   e.preventDefault();
 });
}
window.addEventListener("load", memo);