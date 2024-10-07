import { getAllCharacters } from "@/_actions/getAllCharacters";
import Image from 'next/image';
import PaginationControl from '@/components/PaginationControl';
import Filter from "@/components/filter";

type HomeProps = {
  searchParams: {
    [key: string]: string | string;
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const response = await getAllCharacters({
    page: searchParams.page ? searchParams.page : "1",
    gender: searchParams.gender ? searchParams.gender : undefined,
    status: searchParams.status ? searchParams.status : undefined
  });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-bold">Rick and Morty Characters</h1>
          <Filter />
        </div>
        {response.status === "Success" ? (
          <>
            <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {response.data.results.map((character) => (
                <div key={character.id} className="flex flex-col items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-md hover:cursor-pointer hover:-translate-y-4 duration-500">
                  <Image width={160} height={160} src={character.image} alt={character.name} className="w-40 h-40 object-cover rounded-full" />
                  <h2 className="text-xl font-semibold">{character.name}</h2>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-500">{character.status}</p>
                    <span className="text sm text-gray-900">|</span>
                    <p className="text-sm text-gray-500">{character.gender}</p>
                  </div>
                </div>
              ))}
            </section>
            <PaginationControl
              currentPage={searchParams.page ? parseInt(searchParams.page) : 1}
              metadata={{
                hasNextPage: response.data.info.next !== null,
                totalPages: response.data.info.pages
              }}
              className="col-span-full"
            />
          </>
        ) : (
          <p className="text-rose-500">{response.errorMessage}</p>
        )}
      </main>
    </div>
  );
}
