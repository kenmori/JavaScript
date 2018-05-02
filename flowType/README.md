## ざっくり理解するflowType


### $ElementType<T,K>

Tに渡した型のkeyを指定Kに指定するとその型になる

```js
type obj = {
  name: string,
  age: number
}

("kenji": $ElementType<obj, "name">)//ok!

```

### $Diff<Props, DefaultProps>

```js
$Diff<A, B>

Aはprops
Bはdefaultprops

このdefaultPropsにあるpropertyはPropsには必須。
渡ってこなくてはいけない。
propsに増える分は許容される

またPropを送らない表現ができる
$Diff<{}, {nope: number}> //Error
$Diff<{}, {nop: number | void}> //ok
```
