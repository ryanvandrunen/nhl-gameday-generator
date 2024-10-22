import axios from 'axios';
import { NHLScoreResponse } from './types';

export const getNHLGames = async () => {
  const { data } = await axios.get<NHLScoreResponse>('/api/games');
  return data;
};