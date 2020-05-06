'use strict'

function ShowResult () {}
ShowResult.prototype = {
  showPFC: function (dailyProGram, dailyFatGram, dailyCarbsGram) {
    console.log(
      `PFC per day: Protein ${dailyProGram}g, Fat ${dailyFatGram}g, Carbs ${dailyCarbsGram}g`
    )
  },
  showMacros: function (proPerMeal, fatPerMeal, carbsPerMeal) {
    console.log(
      `Macros for each meal: Protein ${proPerMeal}g, Fat ${fatPerMeal}g, Carbs ${carbsPerMeal}g`
    )
  },
  showKcalAndFreq: function (kcal, frequency) {
    console.log(`Total calories: ${kcal}`)
    console.log(`Meal frequency: ${frequency}`)
  }
}

function MacroPlanner () {}
MacroPlanner.prototype = new ShowResult()

MacroPlanner.prototype.losefat = function (lbm, frequency) {
  const fatLossKcal = getLoseFatKcal(lbm)
  const fatKcal = getFatKcal(fatLossKcal)
  const dailyProGram = getProGram(lbm)
  const proKcal = getProKcal(dailyProGram)
  const carbsKcal = getCarbsKcal(fatLossKcal, fatKcal, proKcal)
  const dailyFatGram = getFatGram(fatKcal)
  const dailyCarbsGram = getCarbsGram(carbsKcal)
  const fatPerMeal = Math.round(dailyFatGram / frequency)
  const proPerMeal = Math.round(getProGram(lbm) / frequency)
  const carbsPerMeal = Math.round(getCarbsGram(carbsKcal) / frequency)

  this.showKcalAndFreq(fatLossKcal, frequency)
  this.showPFC(dailyProGram, dailyFatGram, dailyCarbsGram)
  this.showMacros(proPerMeal, fatPerMeal, carbsPerMeal)
}

// meal plan if maitain weight
MacroPlanner.prototype.maintainWeight = function (lbm, frequency) {
  const maintenanceKcal = getMaintenanceKcal(lbm)
  const fatKcal = getFatKcal(maintenanceKcal)
  const dailyProGram = getProGram(lbm)
  const proKcal = getProKcal(dailyProGram)
  const carbsKcal = getCarbsKcal(maintenanceKcal, fatKcal, proKcal)
  const dailyFatGram = getFatGram(fatKcal)
  const dailyCarbsGram = getCarbsGram(carbsKcal)
  const fatPerMeal = Math.floor(dailyFatGram / frequency)
  const proPerMeal = Math.floor(getProGram(lbm) / frequency)
  const carbsPerMeal = Math.floor(getCarbsGram(carbsKcal) / frequency)

  this.showKcalAndFreq(maintenanceKcal, frequency)
  this.showPFC(dailyProGram, dailyFatGram, dailyCarbsGram)
  this.showMacros(proPerMeal, fatPerMeal, carbsPerMeal)
}

// meal plan build muscle
MacroPlanner.prototype.buildMuscle = function (lbm, frequency) {
  const buildKcal = getBuildMuscleKcal(lbm)
  const fatKcal = getFatKcal(buildKcal)
  const dailyProGram = getProGram(lbm)
  const proKcal = getProKcal(dailyProGram)
  const carbsKcal = getCarbsKcal(buildKcal, fatKcal, proKcal)
  const dailyFatGram = getFatGram(fatKcal)
  const dailyCarbsGram = getCarbsGram(carbsKcal)
  const fatPerMeal = Math.floor(dailyFatGram / frequency)
  const proPerMeal = Math.floor(getProGram(lbm) / frequency)
  const carbsPerMeal = Math.floor(getCarbsGram(carbsKcal) / frequency)

  this.showKcalAndFreq(buildKcal, frequency)
  this.showPFC(dailyProGram, dailyFatGram, dailyCarbsGram)
  this.showMacros(proPerMeal, fatPerMeal, carbsPerMeal)
}

// LBM
function getLbm (kg, fatInput) {
  const fatPercentage = 1 - fatInput / 100
  const lbm = kg * fatPercentage
  return lbm
}

// kcal for lose fat
function getLoseFatKcal (lbm) {
  const kcal = lbm * 35
  return kcal
}

// kcal for maintenance
function getMaintenanceKcal (lbm) {
  const kcal = lbm * 40
  return kcal
}

// kcal for build muscle
function getBuildMuscleKcal (lbm) {
  const kcal = lbm * 45
  return kcal
}

// protein kcal
function getProKcal (proGram) {
  const proKcal = 4 * proGram
  return proKcal
}

// protein grams
function getProGram (lbm) {
  const getProGram = Math.floor(lbm * 2.2)
  return getProGram
}

// carbs kcal
function getCarbsKcal (kcal, fatKcal, proKcal) {
  const carbsKcal = kcal - (fatKcal + proKcal)
  return carbsKcal
}

// carbs gram
function getCarbsGram (carbsKcal) {
  const carbsGram = carbsKcal / 4
  return carbsGram
}

// fat kcal
function getFatKcal (kcal) {
  const fatKcal = kcal * 0.2
  return fatKcal
}

// fat gram
function getFatGram (fatKcal) {
  const fatGram = Math.round(fatKcal / 9)
  return fatGram
}

function Data (kg, fat, frequency) {
  this.frequency = frequency
  this.lbm = getLbm(kg, fat)
}

module.exports = {
  MacroPlanner,
  Data
}
