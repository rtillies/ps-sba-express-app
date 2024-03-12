const express = require('express')
const router = express.Router()
const teams = require('../data/teams')


// GET: read all teams
router.get('/', (req, res, next) => {
  // res.send('GET: read all teams')
  res.json(teams)
})

// POST: create new team
router.post('/', (req, res, next) => {
  // res.send('POST: create new team')
  if(req.body.TeamName && req.body.Conference && req.body.Captain && req.body.Teammate && req.body.City && req.body.State) {
    if (teams.find((t) => t.TeamName == req.body.TeamName)) {
      res.json({ error: `Team Name already exists: ${req.body.TeamName}`})
      return
    }
    const newTeam = {
      ID: teams[teams.length - 1].ID + 1,
      TeamName: req.body.TeamName,
      Conference: req.body.Conference,
      Captain: req.body.Captain,
      Teammate: req.body.Teammate,
      City: req.body.City,
      State: req.body.State,
      Wins: 0,
      Loss: 0
    }
    teams.push(newTeam)
    console.log(`Successful POST: ${newTeam.ID} ${newTeam.TeamName}`);
    res.json(teams[teams.length - 1])
  } else {
    res.json({ error: 'Insufficient Data'})
  }
})

// GET: read team by id
router.get('/:id', (req, res) => {
  // res.send(`GET: read team by id ${req.params.id}`)
  const team = teams.find((t) => t.ID == req.params.id)
  if(team) res.json(team)
  else next();

})

// PATCH: update team by id
router.patch('/:id', (req, res) => {
  res.send(`PATCH: update team by id ${req.params.id}`)
})

// DELETE: delete team by id
router.get('/:id', (req, res) => {
  res.send(`DELETE: delete team by id ${req.params.id}`)
})

module.exports = router;