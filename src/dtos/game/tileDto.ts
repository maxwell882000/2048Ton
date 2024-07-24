export interface TileDto {
    uniqueId: string;
    value: number;
    isNew: boolean;
    cumulated: number;
    isMerged?: boolean;
}