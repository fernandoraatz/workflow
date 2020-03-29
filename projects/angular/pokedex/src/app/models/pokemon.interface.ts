/*
|--------------------------------------------------------------------------
| Model - Todo
|--------------------------------------------------------------------------
*/ 

// export interface PokeListResponse{
//     created: string,
//     modified: string,
//     name: string,
//     pokemon: any[],
//     resource_uri: string
// }

export interface PokeListResponse{
  count: number,
  next: string,
  pevious: string,
  results: any[]
}