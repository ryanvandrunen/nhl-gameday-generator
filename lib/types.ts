export interface NHLGame {
    id: number;
    season: number;
    gameType: number;
    gameDate: string;
    startTimeUTC: string;
    awayTeam: {
      id: number;
      name: {
        default: string;
      };
      abbrev: string;
    };
    homeTeam: {
      id: number;
      name: {
        default: string;
      };
      abbrev: string;
    };
    venue: {
      default: string;
    };
    gameState: string;
    gameScheduleState: string;
  }
  
  export interface NHLScoreResponse {
    gameWeek: {
      date: string;
      games: NHLGame[];
    }[];
    todayGames: NHLGame[];
  }