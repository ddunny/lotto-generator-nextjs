import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import _ from 'underscore'; // 관례적으로 .. 로드할 때는 같은 이름으로 합니다.
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Number = styled.span`
  display: flex;
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  font-size: 3rem;
  background: ${ props => {
    const n = parseInt(props.children, 10);
    if (n <= 10) {
      return 'yellow';
    }
    else if (n <= 20) {
      return 'blue';
    }
    else if (n <= 30) {
      return 'red';
    }
    else if (n <= 40) {
      return 'black';
    }
    else {
      return 'green';
    }
  }};
  color: ${ props => {
    const n = parseInt(props.children, 10);
    return (10 < n && n <= 20 || 30 < n && n <= 40) ? 'white' : 'black';
  }}
`;

const Btn = styled.button`
  width: 200px;
  height: 50px;
  margin: 10px;
  border-radius: 5px;
  font-size: 2rem;
  background: #e5e5e5;
  border: #ddd;
`;

//` : es6에서 문자열을 다루는 방법으로 추가된 것입니다.
// ${}를 이용해서 함수를 넣을수도 있고 변수를 넣을수도 있습니다. 함수: 리턴처리가 잘되어 있어야겠죠

// justify-content,align-items : display가 flex 여야 적용
// styled-component 플러그인 추가하면, lint? 된다고?

// npm : node.js 기반. node 를 위한 패키지 매니저입니다. npm은 위와 같이 임폴트해서 사용하면 돼요
// node .. 두가지환경에서 접근하고 있어요. 프론트쪽, 백엔드쪽 모두에서 읽기 위함입니다.
// import $ from 'jquery'; // 무조건 로드할 때 document 를 참조하기 때문에, 사용할 때 프론트쪽인지 백엔드쪽인지 분기처리를 해주어야 한다.
// import axios from 'axios'; // 얘는 백엔드,브라우저에서 모두 가능하다고 되어있어서 jquery 와 다르게 신경안쓰고 그냥 쓰면 된다.

// 관례 
// underscore => _
// jQuery => $

function generate() {
  let numbers = [];
  _.times(45, n => numbers.push(n + 1)); // 45로 했을 때 0 ~ 44 도는데 우리가 필요한 수는 1~45이기 때문에 push 할 때 1을 더해준 것
  numbers = _.shuffle(numbers); // _ : 원본을 변경하지 않고, 변경한 값을 리턴하는 형식입니다. 따라서 원본을 바꾸려면 다시 원본에 덮어주는 작업이 필요합니다.
  numbers.length = 6; // length : 읽기 전용의 값이 아니라 , 쓰기도 가능함 . 이렇게 하면 앞에서부터 6개를 자른다.
  return numbers;
}

const Home = () => {
  // const [list, setList] = React.useState(generate()); // state 선언 // 이렇게 하면 경고 발생 // Warning: Text content did not match. Server: "44" Client: "25"
  const [list, setList] = React.useState([]); // state 선언
  const regenerate = () => {
    // state 에 값 넣기
    setList(generate());
  }

  React.useEffect(() => {
    // mount, update 될 때 이게 실행됩니다.
    regenerate();
  }, []); // [] => 주시대상입니다. 주시할 대상이 비어있다는것은 update 때는 보지 않고 mount 될 때 보겠다는 뜻
  // mount 프론트에서 마운트. ! 서버사이드 렌더링은 막은거 ??.. 다시 공부하기

  return (
    // 리액트 : 변경이 되는 모든것은 state를 사용하길 권장. 사용안해도 되긴 하는데 ^^.@
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <div className='container'>
        <Row>
          {
            list.map(element => <Number key={element}>{element}</Number>)  // [] 로 묶인 형태로 출력된다.
          }

          {/* list 중복된 값이 출력되는 경우가 있다..(로또의 경우엔 없지만) 
          이 경우 key 를 반드시 설정해주어야 한다.
          내부적으로 다른 key를 사용하도록 하기 위해 
          복잡한 구조일 때 이걸 하지 않으면 굉장히 성능 저하
          페이지 자체가 안나오거나 심각한 건 아닌데 해주자
          key는 유니크하게 주세요.
          ex : key={new Date().getTime().toString() + Math.random()}
          */}

          {/* Math.random() 만 썼을 때, 같은게 나올 수~도 있으요 */}
        </Row>

        <div>
          <Btn onClick={regenerate}>재생성</Btn>
        </div>

      </div>

      <div>
        {/* <button onClick={() => setList(generate())}></button> 로 작성해도 되지 않나요? 의문을 가질 수 있는데.. 취향의 차이다!*/}
      </div>

      {/* scope */}
      {/* 이 컴포넌트 안에서만 사용할 수 있는 스타일이라는 의미입니다. */}
      {/* 다른 컴포넌트에 같은 이름의 스타일이 존재해도, 괜찮습니다. */}
      {/* 모든 컴포넌트에서 공통으로 사용하려면 _document.js에 작성해주세요. */}
      <style jsx>{`
      .container {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
  `}</style>
    </div>
  )
}

export default Home
