### styledComponentsと仲良くなる


#### 前提

```js
//importする
import styled from 'styled-components'
```


#### 最小の指定

```js
cosnt Button = styled.button`
  color: red;
`
//render部分
render(){
  return (<Button></Button>)
}
```

### defaultPropsとして指定する

```js
cosnt Button = styled.button`
  color: red;
  backgroun: ${(theme) => thme.main}
`
Button.defaultProps = {
  theme: {
      main: "#0088ee"
  }
}
```

### 呼び出し時指定する

```js
const Button = styled.button`
  color: ${({theme}) => theme.main};
  border: 2px solid ${({theme})=> theme.main};
`

render(){
  return (<Button theme={{main: red}}></Button>)
}

```

### 拡張する

```js
cosnt Button = styled.button`
  color: red;
`
const ButtonExtend = Button.extend`
  border-color: green
`
```

