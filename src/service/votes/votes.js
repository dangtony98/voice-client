import AsyncStorage from '@react-native-async-storage/async-storage';
import { castVote } from '../api/votes';

const initVoteState = async (item, setVoteState) => {
  const user = JSON.parse(await AsyncStorage.getItem('user'));
  if (item.votes.downvoters.includes(user._id)) {
    setVoteState('DOWN');
  }
  
  if (item.votes.upvoters.includes(user._id)) {
    setVoteState('UP');
  }
}

const handleVote = (item, voteState, voteCount, vote, setVoteState, setVoteCount) => {
  if (voteState == vote) {
    // case: casted vote is same as vote state
    castVote({ voteType: '', vote_on_id: item._id }, () => {
      setVoteState('NONE');
      vote == 'UP' 
      ? setVoteCount(voteCount - 1) 
      : setVoteCount(voteCount + 1);
    });
  } else {
    // case: casted vote is different from vote state
    castVote({ voteType: vote.toLowerCase(), vote_on_id: item._id }, () => {
      setVoteState(vote);
      switch (voteState) {
        case 'UP':
          setVoteCount(voteCount - 2);
          break;
        case 'DOWN':
          setVoteCount(voteCount + 2);
          break;
        case 'NONE':
          vote == 'UP' 
          ? setVoteCount(voteCount + 1) 
          : setVoteCount(voteCount - 1);
          break;
      }
    });
  }
}

export {
  initVoteState,
  handleVote
}