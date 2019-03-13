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
    password: '1234'
  },
  {
    saltyUserId: '37b81aec-6af0-426d-9d4c-9fa5cc1e0d8c',
    username: 'ronald',
    password: 'abcd'
  }
];

let saltyComments = [
  {
    saltyUserId: 'a4a5c672-9696-4523-b57d-a3db47b6422d',
    comments: [
      {
        commentId: 'c3bf9686-9023-4496-b72a-53d13b837c98',
        commentText: 'I like sand.',
        commentSentiment: 'positive'
      },
      {
        commentId: '2677f21f-b371-4a1c-8c40-c614c0eb36a5',
        commentText: "I don't like breezes.",
        commentSentiment: 'negative'
      }
    ]
  },
  {
    saltyUserId: '37b81aec-6af0-426d-9d4c-9fa5cc1e0d8c',
    comments: [
      {
        commentId: '39a853e0-e241-4b60-89e1-7b3dc702590f',
        commentText: 'I hate soup',
        commentSentiment: 'negative'
      },
      {
        commentId: '67e29dfe-959e-491c-ac6d-6ead940c9e4f',
        commentText: 'I love sandwiches',
        commentSentiment: 'positive'
      }
    ]
  }
];

const commentAnalysis = ['positive', 'negative'];

const commentAnalysisRandom = () => {
  return commentAnalysis[
    Math.floor(Math.random() * Math.floor(commentAnalysis.length))
  ];
};

// app.post('/api/comments', authenticator, (req, res) => {
//   setTimeout(() => {
//     res.send(commentAnalysisRandom());
//   }, 100);
// });

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
  const saltyUser = saltyUsers.filter(
    userObject => userObject.username === username
  )[0];
  if (password === saltyUser.password) {
    req.loggedIn = true;
    res.status(200).json({
      saltyToken: token,
      saltyUserId: saltyUser.saltyUserId
    });
  } else {
    res
      .status(403)
      .json({ error: 'Username or Password incorrect. Please see README.md.' });
  }
});

app.post('/api/signup', (req, res) => {
  const newUser = { saltyUserId: uuid.v4(), ...req.body };

  // Need to check if username is already taken:
  saltyUsers = [...saltyUsers, newUser];

  // This needs to return an error if username is already taken:
  res.status(200).json({});
});

// I used req.params because I couldn't figure out how to pass saltyUserId in a .get(), and I got errors when I used .post().
app.get('/api/saltyComments/:saltyUserId', authenticator, (req, res) => {
  const saltyUserComments = saltyComments.filter(
    commentsObject => commentsObject.saltyUserId === req.params.saltyUserId
  )[0].comments;
  setTimeout(() => {
    res.send(saltyUserComments);
  }, 100);
});

app.post('/api/saltyComments', authenticator, (req, res) => {
  const { saltyUserId, newCommentText } = req.body;
  const saltyUserComments = saltyComments.filter(
    commentsObject => commentsObject.saltyUserId === req.body.saltyUserId
  )[0].comments;
  const newComment = {
    commentId: uuid.v4(),
    commentText: newCommentText,
    commentSentiment: commentAnalysisRandom()
  };
  const saltyUserCommentsAdd = [...saltyUserComments, newComment];
  saltyComments = saltyComments.map(commentsObject => {
    if (commentsObject.saltyUserId === saltyUserId) {
      return {
        saltyUserId: commentsObject.saltyUserId,
        comments: saltyUserCommentsAdd
      };
    } else {
      return commentsObject;
    }
  });
  // Needs error code:
  setTimeout(() => {
    res.send(saltyUserCommentsAdd);
  }, 100);
});

app.delete('/api/saltyComments', authenticator, (req, res) => {
  const { saltyUserId, commentIdDelete } = req.body;
  const saltyUserComments = saltyComments.filter(
    commentsObject => commentsObject.saltyUserId === req.body.saltyUserId
  )[0].comments;
  const saltyUserCommentsDelete = saltyUserComments.filter(
    comment => comment.commentId !== commentIdDelete
  );
  saltyComments = saltyComments.map(commentsObject => {
    if (commentsObject.saltyUserId === saltyUserId) {
      return {
        saltyUserId: commentsObject.saltyUserId,
        comments: saltyUserCommentsDelete
      };
    } else {
      return commentsObject;
    }
  });
  setTimeout(() => {
    res.send(saltyUserCommentsDelete);
  }, 100);
});

app.put('/api/saltyComments', authenticator, (req, res) => {
  const { saltyUserId, commentId, editCommentText } = req.body;
  const saltyUserComments = saltyComments.filter(
    commentsObject => commentsObject.saltyUserId === saltyUserId
  )[0].comments;

  const saltyUserCommentsEdit = saltyUserComments.map(commentObject => {
    if (commentObject.commentId === commentId) {
      return {
        commentId: commentObject.commentId,
        commentText: editCommentText,
        commentSentiment: commentAnalysisRandom()
      };
    } else {
      return commentObject;
    }
  });

  saltyComments = saltyComments.map(commentsObject => {
    if (commentsObject.saltyUserId === saltyUserId) {
      return {
        saltyUserId: commentsObject.saltyUserId,
        comments: saltyUserCommentsEdit
      };
    } else {
      return commentsObject;
    }
  });

  setTimeout(() => {
    res.send(saltyUserCommentsEdit);
  }, 100);
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

// app.delete('/api/friends/:id', authenticator, (req, res) => {
//   const { id } = req.params;

//   friends = friends.filter(f => f.id !== id);

//   res.send(friends);
// });

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
