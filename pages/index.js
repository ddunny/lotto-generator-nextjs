import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import _ from 'underscore'; // 관례적으로 .. 로드할 때는 같은 이름으로 합니다.


// npm : node.js 기반. node 를 위한 패키지 매니저입니다. npm은 위와 같이 임폴트해서 사용하면 돼요
// node .. 두가지환경에서 접근하고 있어요. 프론트쪽, 백엔드쪽 모두에서 읽기 위함입니다.
// import $ from 'jquery'; // 무조건 로드할 때 document 를 참조하기 때문에, 사용할 때 프론트쪽인지 백엔드쪽인지 분기처리를 해주어야 한다.
// import axios from 'axios'; // 얘는 백엔드,브라우저에서 모두 가능하다고 되어있어서 jquery 와 다르게 신경안쓰고 그냥 쓰면 된다.

// 관례 
// underscore => _
// jQuery => $

let numbers = [];
_.times(45, n => numbers.push(n + 1)); // 45로 했을 때 0 ~ 44 도는데 우리가 필요한 수는 1~45이기 때문에 push 할 때 1을 더해준 것
numbers = _.shuffle(numbers); // _ : 원본을 변경하지 않고, 변경한 값을 리턴하는 형식입니다. 따라서 원본을 바꾸려면 다시 원본에 덮어주는 작업이 필요합니다.
numbers.length = 6; // length : 읽기 전용의 값이 아니라 , 쓰기도 가능함 . 이렇게 하면 앞에서부터 6개를 자른다.

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
    </Head>

    <div class="hero">
      {numbers.join(', ')}
    </div>


    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
)

export default Home
