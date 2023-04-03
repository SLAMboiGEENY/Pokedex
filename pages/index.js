import React, { useState, useEffect } from 'react';
import Head from "next/head";
import Link from "next/link";



export async function getStaticProps() {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );

  return {
    props: {
      pokemon: await resp.json(),
    },
  };
}


export default function Home({ pokemon }) {
  return (
    <div className="w-full max-w-7xl min-h-screen bg-gray-400">
      <h2 className="text-5xl py-10 font-bold uppercase text-black text-center">Pokedex</h2>
      <div className="mx-auto grid sm:grid-cols-1 md:grid-cols-3 sm:gap-2">
        <Head>
          <title>Mandingo List</title>
        </Head>
      
          {pokemon.map((pokemon) => (
            <div className="" key={pokemon.id}>
              <Link href={`/pokemon/${pokemon.id}`}>
                <div className="z-10 flex items-center justify-center flex-col">
                  <img 
                    className="max-h-50 border-gray-800 border-8 sm:h-80 lg:h-96"
                    src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                    alt={pokemon.name}
                  />
                  <h3 className="z-1 text-xl font-semibold text-black my-5 text-center">{pokemon.name}</h3>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

