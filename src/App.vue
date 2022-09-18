<script setup>

//TO-DO: make it responsive, github (correct folder), readme, presentation

import { reactive, computed } from "vue";


// global var with the winning combinations

const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// game reactives

let game = reactive({
  board: ['','','','','','','','',''],
  player: 'X',
  collectedX: [],
  collectedO: []
});

// handling the click event

const clickHandler = (index) => {
  if (winner.value) return null;
  if (game.board[index] !== ''){
    return null;
  } else {
  game.board[index] = game.player;
  game.player === 'X' ? game.collectedX.push(index) : game.collectedO.push(index)
  game.player === 'X' ? game.player = 'O' : game.player = 'X';
  }
}

// check if there is a winner

const winner = computed(() =>  {
  let status = null;
  WINNING_COMBINATIONS.forEach((tris) => {
    if (tris.every(elem => game.collectedX.includes(elem))) {
      status = 'X';
    } 
    else if (tris.every(elem => game.collectedO.includes(elem))) {
      status = 'O';
    }
  })
  return status;
});

// check if there is a draw

const isDraw = computed(() => {
  if (game.board.includes('')) return false;
  else if (!game.board.includes('') && winner.value != null ) return false;
  else return true;
})

// board reset

const resetBoard = () => {
  game.board = ['','','','','','','','',''];
  game.player = 'X';
  game.collectedO = [];
  game.collectedX = [];
}

</script>

<template>
  <div class="relative min-h-screen">
    <div class="flex flex-col pb-20">
  <header class="flex justify-center mt-12">
    <h1 class="text-6xl sm:text-8xl font-bold text-emerald-500 tracking-tighter"> TicTacToe</h1>
  </header>
  <main>
    <div class="flex justify-center mt-12">
      <div class="grid grid-cols-3">
        <div v-for="(cell, index) in game.board" :key="cell.id" :class="`cell ${cell === 'X' ? 'text-red-700' : 'text-cyan-700'}`" @click="clickHandler(index)"> {{ cell }}</div>
      </div>
    </div>
    <div class="flex justify-center mt-12">
      <div v-if="!isDraw" class="flex flex-row px-2 sm:px-4 mr-4 sm:mr-12 items-center border border-emerald-300 shadow-lg rounded-xl">
          <h3 class="sm:text-xl mr-2 sm:mr-4 font-bold text-stone-600">Player: </h3>
          <p class="font-chalk text-2xl sm:text-4xl mt-1">{{game.player}}</p>
      </div>
      <div v-else-if="isDraw" class="flex flex-row px-2 sm:px-4 mr-6 sm:mr-12 items-center border border-red-300 shadow-lg rounded-xl">
          <p class="font-chalk text-2xl sm:text-4xl mt-1">DRAW</p>
      </div>
        <button class="bg-emerald-500 py-2 px-4 sm:py-4 sm:px-6 rounded-xl shadow-xl hover:bg-emerald-700 transition-all active:shadow-sm text-stone-100" @click="resetBoard">{{ !isDraw ? "Reset Board" : "New Game" }}</button>
      </div>
      
      <div v-if="winner" class="fixed top-0 left-0 right-0 z-10 bg-black h-screen bg-opacity-70">
        <div class="flex flex-col items-center justify-center h-screen">
          <div class="bg-stone-100 flex-col flex rounded-xl shadow-lg p-8 sm:p-12 items-center justify-center">
            <v-icon name="gi-podium-winner" scale="3" animation="wrench" class="mb-6 text-emerald-500" />
          <h1 class="text-4xl sm:text-6xl text-stone-700 mb-12"> Player {{winner}} Wins! </h1>
          <button class="bg-emerald-500 font-bold py-4 px-6 rounded-xl shadow-xl hover:bg-emerald-700 transition-all active:shadow-sm text-stone-50" @click="resetBoard">New Game</button>
        </div>
        </div>
      </div>
  </main>
  </div>
  <footer class="flex justify-center items-center absolute bottom-0 mt-12 bg-emerald-500 w-full h-20 ">
    <small class="font-lighter text-md text-stone-50"> Made by Cristopher Turazza - 
      <a href="https://talent.start2impact.it/profile/cristopher-turazza" class="font-bold underline hover:text-stone-800">start2impact</a>
    </small>
  </footer>
  </div>
</template>

<style scoped>
  .cell {
  @apply w-20 h-20 sm:w-32 sm:h-32 font-chalk flex items-center justify-center transition-all font-bold text-8xl sm:hover:bg-emerald-100 cursor-pointer;
  }
  .cell:nth-child(2), .cell:nth-child(8) {
    border-left: 1px solid;
    border-right: 1px solid;
    border-left-color: rgb(214 211 209);
    border-right-color: rgb(214 211 209);
  }
  .cell:nth-child(4), .cell:nth-child(6) {
    border-top: 1px solid;
    border-bottom: 1px solid;
    border-top-color: rgb(214 211 209);
    border-bottom-color: rgb(214 211 209);
  }
  .cell:nth-child(5) {
    border: 1px solid;
    border-color: rgb(214 211 209)
  }

</style>

