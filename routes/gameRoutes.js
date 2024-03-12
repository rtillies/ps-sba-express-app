const express = require('express')
const router = express.Router()
const games = require('../data/games')

// GET: read all games
router.get('/', (req, res) => {
  // res.send('GET: read all games')
  // res.json(games)
  res.render('games/index', {games})
})

// GET: read 
router.get('/2024-*-*', (req, res) => {
  // console.log(req);
  // const date = console.log(req.path.slice(1));
  const date = req.path.slice(1);
  // res.send(`Get games by date ${req.body}`)
  const gamesOnDate = games.filter((g) => g.date == date)
  console.log(gamesOnDate);
  // if(gamesOnDate) {
  //   // res.json(game)
  //   // res.render('games/', {gamesOnDate});
  // } else {
  //   res.render('index', `No games played on ${date}`)
  // }

  res.send(`Get games played on date ${date}`)
})
// router.get('/abc*def', (req, res) => {

// router.get('/:id', (req, res) => {
//   // res.send(`GET: read game by id ${req.params.id}`)
//   const game = games.find((g) => g.id == req.params.id)
//   if(game) {
//     // res.json(game)
//     res.render('games/game', {game});
//   }
//   else next();
// })



// POST: create new game
router.post('/', (req, res, next) => {
  // res.send('POST: create new game')
  if(req.body.code && req.body.date && req.body.homeTeam && req.body.awayTeam && req.body.homeScore && req.body.awayScore) {
    if (games.find((g) => g.code == req.body.code)) {
      res.json({ error: `Game code already exists: ${g.code}` })
      return
    }
    const winner = req.body.homeScore > req.body.awayScore 
      ? req.body.homeTeam
      : req.body.awayTeam

    const newGame = {
      id: games[games.length - 1].id + 1,
      code: req.body.code,
      date: req.body.date,
      homeTeam: req.body.homeTeam,
      awayTeam: req.body.awayTeam,
      homeScore: req.body.homeScore,
      awayScore: req.body.awayScore,
      winner: winner
    }
    games.push(newGame)
    console.log(`Successful POST: ${newGame.id} ${newGame.homeTeam} vs ${newGame.awayTeam}`);
    res.json(games[games.length - 1])
  } else {
    res.json({ error: 'Insufficient Data'})
  }
})

// GET: read game by id
router.get('/:id', (req, res) => {
  // res.send(`GET: read game by id ${req.params.id}`)
  const game = games.find((g) => g.id == req.params.id)
  if(game) {
    // res.json(game)
    res.render('games/game', {game});
  }
  else next();
})

// PATCH: update game by id
router.patch('/:id', (req, res) => {
  // res.send(`PATCH: update game by id ${req.params.id}`)
  const game = games.find((g, i) => {
    if (g.id == req.params.id) {
      for (const key in req.body) {
        games[i][key] = req.body[key];
      }
      return true;
    }
  });

  if(game) res.json(game)
  else next();
})

// DELETE: delete game by id
router.delete('/:id', (req, res) => {
  // res.send(`DELETE: delete game by id ${req.params.id}`)
  const game = games.find((g, i) => {
    if (g.id == req.params.id) {
      games.splice(i, 1);
      return true;
    }
  });

  if(game) res.json(game)
  else next();
})

module.exports = router;