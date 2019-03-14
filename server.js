const uuid = require('uuid');
const vader = require('vader-sentiment');
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
    username: 'dirtyrichkidd',
    password: 'cockroachesandcher'
  }
];

let saltyComments = [
  {
    saltyUserId: 'a4a5c672-9696-4523-b57d-a3db47b6422d',
    comments: [
      {
        commentCom: 0.3612,
        commentId: '094e8980-1e51-4199-82a3-436f718af16b',
        commentNeg: 0,
        commentNeu: 0.444,
        commentPos: 0.556,
        commentSent: 'positive',
        commentText: 'I feel like singing.'
      },
      {
        commentCom: 0,
        commentId: '729876cc-cc97-4f3c-b3b7-3199d7083cfa',
        commentNeg: 0,
        commentNeu: 1,
        commentPos: 0,
        commentSent: 'neutral',
        commentText: 'have you read this book?'
      },
      {
        commentCom: -0.6249,
        commentId: '76b77b84-7877-4800-b777-4e350eed8435',
        commentNeg: 0.506,
        commentNeu: 0.494,
        commentPos: 0,
        commentSent: 'negative',
        commentText: 'Sand is the absolute worst.'
      }
    ]
  },
  {
    saltyUserId: '37b81aec-6af0-426d-9d4c-9fa5cc1e0d8c',
    comments: [
      {
        commentCom: -0.3612,
        commentId: 'b062c6fa-b310-4c73-b4a5-2ca4a8340ff2',
        commentNeg: 0.714,
        commentNeu: 0.286,
        commentPos: 0,
        commentSent: 'negative',
        commentText: 'iPhone Sucks'
      },
      {
        commentCom: 0,
        commentId: '411ae444-6d79-40a7-a74a-5bf77b40f780',
        commentNeg: 0,
        commentNeu: 1,
        commentPos: 0,
        commentSent: 'neutral',
        commentText: 'Hello'
      },
      {
        commentCom: 0.6249,
        commentId: 'e73f3a14-da4f-41b1-9561-956c5a3a1cd8',
        commentNeg: 0,
        commentNeu: 0.328,
        commentPos: 0.672,
        commentSent: 'positive',
        commentText: 'Android is awesome'
      }
    ]
  }
];

const checkSentiment = commentText => {
  const sentObj = vader.SentimentIntensityAnalyzer.polarity_scores(commentText);
  let sentimentCalc = '';
  sentObj.compound >= 0.05
    ? (sentimentCalc = 'positive')
    : sentObj.compound <= -0.05
    ? (sentimentCalc = 'negative')
    : (sentimentCalc = 'neutral');

  return {
    commentNeg: sentObj.neg,
    commentNeu: sentObj.neu,
    commentPos: sentObj.pos,
    commentCom: sentObj.compound,
    commentSent: sentimentCalc
  };
};

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
  const newComments = { saltyUserId: newUser.saltyUserId, comments: [] };
  // Need to check if username is already taken:
  saltyUsers = [...saltyUsers, newUser];
  saltyComments = [...saltyComments, newComments];

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
  const comSentObj = checkSentiment(newCommentText);
  const newComment = {
    ...comSentObj,
    commentId: uuid.v4(),
    commentText: newCommentText
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
  const comSentObj = checkSentiment(editCommentText);
  const saltyUserCommentsEdit = saltyUserComments.map(commentObject => {
    if (commentObject.commentId === commentId) {
      return {
        ...comSentObj,
        commentId: commentObject.commentId,
        commentText: editCommentText
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

// app.post('/api/friends', authenticator, (req, res) => {
//   const friend = { id: uuid.v4(), ...req.body };
//   friends = [...friends, friend];
//   res.send(friends);
// });

// app.put('/api/friends/:id', authenticator, (req, res) => {
//   const { id } = req.params;

//   const friendIndex = friends.findIndex(f => f.id == id);

//   if (friendIndex > -1) {
//     const friend = { ...friends[friendIndex], ...req.body };

//     friends = [
//       ...friends.slice(0, friendIndex),
//       friend,
//       ...friends.slice(friendIndex + 1)
//     ];
//     res.send(friends);
//   } else {
//     res.status(404).send({ msg: 'Friend not found' });
//   }
// });

// app.delete('/api/friends/:id', authenticator, (req, res) => {
//   const { id } = req.params;

//   friends = friends.filter(f => f.id !== id);

//   res.send(friends);
// });

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
