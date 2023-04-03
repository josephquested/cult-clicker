// init //

function bindEventListers() {
    document.getElementById('faith-button').onclick = generateFaithButtonClicked
    document.getElementById('indoctrinate-button').onclick = indoctrinateFollowerButtonClicked
    document.getElementById('sacrifice-button').onclick = sacrificeFollowerButtonClicked
}

bindEventListers()

// stuff //

let stuff = {
    faith: 0,
    followers: []
}

// perks //

let faithGainedOnClick = 1
let followersGainedOnClick = 1
let followerFaithGenMultiplier = 1

// costs //

let indoctrinateCost = 10
let indoctrinateCostMultiplier = 2

// update // 

function newFollowerUpdate() {
    changeThing('faith', 1 * followerFaithGenMultiplier)
}

// on clicks //

function generateFaithButtonClicked() {
    changeThing('faith', faithGainedOnClick)
}

function indoctrinateFollowerButtonClicked() {
    if (stuff.faith >= indoctrinateCost) {
        changeThing('faith', -indoctrinateCost)
        indoctrinateCost *= indoctrinateCostMultiplier
        updateButtonUI('indoctrinate', `indoctrinate follower (-${indoctrinateCost} faith)`)
        addFollower()
    } else {
        print('not enough faith to indoctrinate')
    }
}

function sacrificeFollowerButtonClicked() {
    if (stuff.followers.length >= 1) {
        changeThing('faith', 10)
        removeFollower()
    } else {
        print('no followers to sacrifice')
    }
}

// quantity changes //

function changeThing(thing, change) {
    stuff[thing] += change
    updateUI(thing, stuff[thing])
}

function addFollower() {
    stuff.followers.push(setInterval(newFollowerUpdate, 1000))
    updateUI('followers', stuff.followers.length)
}

function removeFollower() {
    clearInterval(stuff.followers.pop())
    updateUI('followers', stuff.followers.length)
}

// ui //

function updateUI(id, quantity) {
    document.getElementById(id).innerHTML = `${id}: ${quantity}`
}

function updateButtonUI(name, str) {
    document.getElementById(`${name}-button`).innerHTML = str
}

function print(str) {
    console.log(str)
}

