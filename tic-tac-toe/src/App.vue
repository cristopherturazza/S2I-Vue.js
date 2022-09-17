<script setup>

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

//TO_DO: check if there is a draw
//       change player status with "DRAW" and button "Reset Board" with "New Game" (change color?) 
//       make an overlay to declare victory, with a button for a new game
//       finish CSS and check responsive

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

// board reset

const resetBoard = () => {
  game.board = ['','','','','','','','',''];
  game.player = 'X';
  game.collectedO = [];
  game.collectedX = [];
}

</script>

<template>
  <header class="flex justify-center mt-12">
    <h1 class="text-8xl font-bold text-emerald-500 tracking-tighter"> TicTacToe</h1>
  </header>
  <main>
    <div class="flex justify-center mt-12">
      <div class="grid grid-cols-3">
        <div v-for="(cell, index) in game.board" :key="cell.id" :class="`cell ${cell === 'X' ? 'text-red-700' : 'text-cyan-700'}`" @click="clickHandler(index)"> {{ cell }}</div>
      </div>
    </div>
    <div class="flex justify-center mt-12">
      <div class="flex flex-row px-4 mr-12 items-center border border-emerald-300 shadow-lg rounded-xl">
        <h3 class="text-xl mr-4 font-bold text-stone-600">Player: </h3>
        <p class="font-chalk text-4xl mt-1">{{game.player}}</p>
      </div>
        <button class="bg-emerald-500 py-4 px-6 rounded-xl shadow-xl hover:bg-emerald-700 active:shadow-sm text-stone-100" @click="resetBoard">Reset Board</button>
      </div>    
  </main>
</template>

<style scoped>
  .cell {
  @apply w-32 h-32 font-chalk flex items-center justify-center font-bold text-8xl hover:bg-emerald-100 cursor-pointer border-stone-300 border;
  }
</style>

