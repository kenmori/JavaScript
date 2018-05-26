#### normalize
```js`
        console.log(schema, normalize)
        //共通化したいところを探す
        //commentとauthorが同じ構造の同じ意味にできる
        //new schema.Entity("entitiy名: トップレベルに持っていきたいもの") idが入っていたらkeyがidになる
        //そのマスターデータをネスとさせる場合
        //
        //
        //const articleschema = new schema.Entity("article", {
        //    author: user,
        //    comment: [commentSchema]//元データが配列になっていたら。包む
        //});


        //元データ
        const article = {
            id: 1,
            author: {
                id: 1,
                name: "kenji"
            },
            comment: [
            {
                    id: 2,
                    name: "keiko"
                },
            {
                    id: 3,
                    name: "keiko"
                }
            ]
        }

        const user = new schema.Entity("user")
        const commentSchema = new schema.Entity("comment", {
            comment: user
        })
        const articleschema = new schema.Entity("article", {
            author: user,
            comment: [commentSchema]
        });

        const data = normalize(article, articleschema)

        console.log(data)
        return (
            <div>
                {JSON.stringify(data)}
            </div>
        )



/////////////

{
  entities : {
  article : { 1: { id : 1 author : 1, comment : [2, 3] } }
  comment : { 2 : { id: 2, name: "keiko"}}, { 3: { id: 3, name: "keiko"}},
  user :{ 1 : { id: 1, name: "kenji"} }
}
  result : 1
}

````








ex2


//////////////

```js
        let article = {
            id: 1,
            author: {
                id: 1,
                name: "kenji"
            },
            comment: { user: [{ //階層が深くなった
                    id: 2,
                name: "keiko"
            }
            ]
            },
        }


        const user = new schema.Entity("user")
        const commentSchema = new schema.Entity("comment", {
            comment:  user
        })
        const articleschema = new schema.Entity("article", {
            author: user,
            comment: {user : [commentSchema]}//受け取りたい場所の階層を変更
        });
        const data = normalize(article, articleschema)

```
