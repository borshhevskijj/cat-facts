import useSWR from 'swr';

export const fetcher = (url: string) => fetch(url).then(res => res.json());
export const baseUrl = 'https://catfact.ninja'

export interface Fact {
    fact: string
    length: number
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
  }
  
export interface FactsResponse {
    data: Fact[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string |null;
    path: string;
    per_page: number;
    prev_page_url: string |null;
    to: number;
    total: number;
  }


interface UseGetAllFacts extends FactsResponse {
    page:number
}
  
export const getInitialFacts = async () => {
  const response = await fetch(`${baseUrl}/facts?page=1&limit=4`);
  const data = await response.json();
  return data as FactsResponse;
};

export const UseGetAllFacts =(initialFacts:FactsResponse,page:UseGetAllFacts['page'])=>{
    const LIMIT = 4; 
    const { data: newFacts, error, isValidating,isLoading,mutate} = useSWR<FactsResponse>(
        page > 1 ? `${baseUrl}/facts?limit=${LIMIT}&page=${page}` : null,
        fetcher,
        {
          fallbackData: page === 1 ?  initialFacts : undefined,
          // keepPreviousData:true,
          dedupingInterval: 120000, 
          revalidateOnFocus: false,
        }
      );
      return {newFacts, error, isValidating,isLoading,mutate}
}

export const UseGetFact =()=>{
    const { data, error,isLoading,mutate,isValidating} = useSWR<Fact>(`${baseUrl}/fact`, fetcher,{
        revalidateOnFocus: false,
    });
    return {data, error, isLoading,mutate,isValidating}
}
