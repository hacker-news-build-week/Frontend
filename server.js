const uuid = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5200;
const app = express();
const token =
  'eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ';

let saltyUsers = [
  {
    saltyUserId: 'a4a5c672-9696-4523-b57d-a3db47b6422d',
    username: 'chris',
    password: 'xyz'
  },
  {
    saltyUserId: '37b81aec-6af0-426d-9d4c-9fa5cc1e0d8c',
    username: 'ronald',
    password: 'abc'
  }
];

let saltyComments = [
  {
    saltyUserId: 'a4a5c672-9696-4523-b57d-a3db47b6422d',
    comments: [
      {
        commentId: 'c3bf9686-9023-4496-b72a-53d13b837c98',
        comment: 'I really hate soup',
        commentSentiment: 'very negative'
      },
      {
        commentId: '2677f21f-b371-4a1c-8c40-c614c0eb36a5',
        comment: 'I love sandwiches',
        commentSentiment: 'positive'
      }
    ]
  },
  {
    saltyUserId: '37b81aec-6af0-426d-9d4c-9fa5cc1e0d8c',
    comments: [
      {
        commentId: '39a853e0-e241-4b60-89e1-7b3dc702590f',
        comment: 'I love soup',
        commentSentiment: 'positive'
      },
      {
        commentId: '67e29dfe-959e-491c-ac6d-6ead940c9e4f',
        comment: 'I hate sandwiches',
        commentSentiment: 'negative'
      }
    ]
  }
];

let commentAnalysis = [
  'very positive',
  'positive',
  'neutral',
  'negative',
  'very negative'
];

const commentAnalysisRandom = () => {
  return commentAnalysis[
    Math.floor(Math.random() * Math.floor(commentAnalysis.length))
  ];
};

let comments = [
  {
    id: 'a4a5c672-9696-4523-b57d-a3db47b6422d',
    name: 'Stream',
    age: 27,
    email: 'stream@gmail.com',
    faveColor: 'aqua',
    faveFood: 'gravity',
    quotation: 'Islands in the _me_...'
  },
  {
    id: '37b81aec-6af0-426d-9d4c-9fa5cc1e0d8c',
    name: 'Book',
    age: 23,
    email: 'book@gmail.com',
    faveColor: 'parchment',
    faveFood: 'thoughts',
    quotation: 'You may judge me by my cover.'
  },
  {
    id: '39a853e0-e241-4b60-89e1-7b3dc702590f',
    name: 'Carbon',
    age: 68,
    email: 'carbon@gmail.com',
    faveColor: 'dark grey',
    faveFood: 'everything',
    quotation:
      'No one ever heard of carbon poisoning. Not _just_ carbon anyway...'
  },
  {
    id: '67e29dfe-959e-491c-ac6d-6ead940c9e4f',
    name: 'Diligence',
    age: 39,
    email: 'diligence@gmail.com',
    faveColor: 'navy',
    faveFood: 'perseverence',
    quotation:
      'Genius is 1% inspiration and 99% me. Think about that for a minute. Now get back to work.'
  },
  {
    id: '2677f21f-b371-4a1c-8c40-c614c0eb36a5',
    name: 'Estuary',
    age: 47,
    email: 'estuary@gmail.com',
    faveColor: 'tan',
    faveFood: 'silt',
    quotation: 'Grahhbbllllhleh...'
  },
  {
    id: 'c3bf9686-9023-4496-b72a-53d13b837c98',
    name: 'Thursday',
    age: 22,
    email: 'thursday@gmail.com',
    faveColor: 'cinnamon',
    faveFood: 'afternoons',
    quotation: 'Sigh.'
  }
];

app.use(bodyParser.json());

app.use(cors());

function authenticator(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === token) {
    next();
  } else {
    res.status(403).json({ error: 'User needs to be logged in to do that.' });
  }
}

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'sentiment' && password === 'hackernews') {
    req.loggedIn = true;
    res.status(200).json({
      payload: token
    });
  } else {
    res
      .status(403)
      .json({ error: 'Username or Password incorrect. Please see README.md.' });
  }
});

app.post('/api/comments', authenticator, (req, res) => {
  setTimeout(() => {
    res.send(commentAnalysisRandom());
  }, 250);
});

app.get('/api/friends/:id', authenticator, (req, res) => {
  const friend = friends.find(f => f.id == req.params.id);

  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).send({ msg: 'Friend not found' });
  }
});

app.post('/api/friends', authenticator, (req, res) => {
  const friend = { id: uuid.v4(), ...req.body };
  friends = [...friends, friend];
  res.send(friends);
});

app.put('/api/friends/:id', authenticator, (req, res) => {
  const { id } = req.params;

  const friendIndex = friends.findIndex(f => f.id == id);

  if (friendIndex > -1) {
    const friend = { ...friends[friendIndex], ...req.body };

    friends = [
      ...friends.slice(0, friendIndex),
      friend,
      ...friends.slice(friendIndex + 1)
    ];
    res.send(friends);
  } else {
    res.status(404).send({ msg: 'Friend not found' });
  }
});

app.delete('/api/friends/:id', authenticator, (req, res) => {
  const { id } = req.params;

  friends = friends.filter(f => f.id !== id);

  res.send(friends);
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
