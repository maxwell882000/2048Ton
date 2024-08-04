export interface LeaderboardApiDto {
    s: number;
    un: string;
    p?: string;
}

export interface LeaderboardApiCloudStorageDto {
    leaderboard: LeaderboardApiDto[];
    expiry: Date;
}