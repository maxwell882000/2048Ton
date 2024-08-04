export interface ReferralApiDto {
    r: number;
    un: string;
    p?: string;
    ac?: boolean;
}

export interface ReferralApiCloudStorageDto {
    referrals: { [referralId: string]: ReferralApiDto };
    expiry: Date;
}