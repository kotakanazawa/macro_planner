#! /usr/bin/env node
'use strict'
const math = require('./math')
const Data = math.Data
const MacroPlanner = math.MacroPlanner
const inquirer = require('inquirer')

function main () {
  const macroPlanner = new MacroPlanner()
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'goal',
        message: 'Select your goal.',
        choices: ['Lose fat', 'Maintain weight', 'Build muscle']
      },
      {
        type: 'number',
        name: 'kg',
        message: 'Enter your bodyweight in kg.'
      },
      {
        type: 'number',
        name: 'fat',
        message: 'Enter your approximate percentage of body fat.'
      },
      {
        type: 'number',
        name: 'frequency',
        message: 'How many times do you want to eat a day?'
      }
    ])
    .then((answer) => {
      const data = new Data(answer.kg, answer.fat, answer.frequency)
      console.log('Here is your meal plan.')
      if (answer.goal === 'Lose fat') {
        macroPlanner.losefat(data.lbm, data.frequency)
      } else if (answer.goal === 'Maintain weight') {
        macroPlanner.maintainWeight(data.lbm, data.frequency)
      } else if (answer.goal === 'Build muscle') {
        macroPlanner.buildMuscle(data.lbm, data.frequency)
      }
      console.log('Good luck!')
    })
    .catch((err) => {
      console.log(err)
    })
}

main()
