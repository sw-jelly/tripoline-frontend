<script setup></script>

<template>
  <div class="flex flex-col h-full w-full align-center items-center justify-center">
    <div class="relative flex justify-around w-full h-[300px] m-auto">
      <p class="bound">
        <span>T</span>
        <span>R</span>
        <span>I</span>
        <span>P</span>
        <span>O</span>
        <span>L</span>
        <span>I</span>
        <span>N</span>
        <span>E</span>
      </p>
      <img src="@/assets/T-Rex.png" />
    </div>

    <!-- <div class="flex logincontainer">
      <button>로그인</button>
      <button>회원가입</button>
    </div> -->
  </div>
</template>

<style>
.logincontainer {
  width: 100%;
  height: 200px;
  align-items: center;
  justify-content: center;
}

.logincontainer button {
  width: 200px;
  height: 50px;
  margin: 0 10px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
  font-size: 20px;
  font-weight: bold;
}

/*フォント*/
.bound span {
  font-family: Consolas, 'Courier New', Courier, Monaco, monospace;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 7em;
  font-weight: bold;
  color: white;
  text-align: center;
  /* width: 100px; */
  height: 100px;
}

/*アニメーション指定
文字数に合わせてleftや開始時間（2つ目のs）を設定する*/
.bound span:nth-child(1) {
  left: -5.6em;
  animation: bound-anim 0.8s 0s infinite;
}
.bound span:nth-child(2) {
  left: -4.2em;
  animation: bound-anim 0.8s 0.1s infinite;
}
.bound span:nth-child(3) {
  left: -2.8em;
  animation: bound-anim 0.8s 0.2s infinite;
}

.bound span:nth-child(4) {
  left: -1.4em;
  animation: bound-anim 0.8s 0.3s infinite;
}

.bound span:nth-child(5) {
  left: 0em;
  animation: bound-anim 0.8s 0.4s infinite;
}

.bound span:nth-child(6) {
  left: 1.4em;
  animation: bound-anim 0.8s 0.5s infinite;
}

.bound span:nth-child(7) {
  left: 2.8em;
  animation: bound-anim 0.8s 0.6s infinite;
}

.bound span:nth-child(8) {
  left: 4.2em;
  animation: bound-anim 0.8s 0.7s infinite;
}

.bound span:nth-child(9) {
  left: 5.6em;
  animation: bound-anim 0.8s 0.8s infinite;
}

/*アニメーションキーフレーム
小さいフォントサイズの場合はtopの数値も縮小すると飛び過ぎない*/
@keyframes bound-anim {
  0%,
  100% {
    top: 0;
    transform: scale(1);
  }
  30% {
    top: -25%;
  }
  50% {
    transform: scale(1);
  }
  90% {
    top: 0;
    transform: scale(1.2, 0.8);
  }
}
</style>
