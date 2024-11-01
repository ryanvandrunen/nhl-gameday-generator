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
      record: string;
      score: string;
      sog: string;
    };
    homeTeam: {
      id: number;
      name: {
        default: string;
      };
      abbrev: string;
      record: string;
      score: string;
      sog: string;
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

  export interface TeamProps {
    logoSrc: string;
    record: string;
    bottomColour: string;
    topColour: string;
  }

  export interface GameDetailsProps {
    venue: string;
    time: string;
    season: string;
  }