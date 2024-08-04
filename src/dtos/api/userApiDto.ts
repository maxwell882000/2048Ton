export enum ReferrerStatus {
    NO_REFERRER,
    HAS_REFERRER,
}

export interface UserApiDto {
    ct?: Date,
    ut?: Date,
    rt?: ReferrerStatus,
    ri?: number,
    un?: string,
    p?: string,
    s?: number
}