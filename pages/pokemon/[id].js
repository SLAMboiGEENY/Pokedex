import React from 'react';
import Head from "next/head";
import Link from "next/link";


export async function getStaticPaths() {
    const resp = await fetch(
        "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
    );
    const pokemon = await resp.json();

    return {
        paths: pokemon.map((pokemon) => ({
            params: { id: pokemon.id.toString() },
        })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const resp = await fetch(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
    );

    return {
        props: {
            pokemon: await resp.json(),
        },
    };
}

export default function Details({ pokemon }) {
    return (
        <div>
            <Head>
                <title>{pokemon.name}</title>
            </Head>
            <div>
                <Link href="/" className="">
                    <span className="text-2xl font-bold w-full bg-blue-300 flex items-center justify-start text-black hover:text-gray-500">home</span>
                </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
                <div className="">
                    <img 
                        className="max-h-50 h-full grid sm:h-80 lg:h-96"
                        src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                        alt={pokemon.name.english}
                    />
                </div>
                <div className="md:ml-10 md:overflow-x-visible">
                    <div className="text-3xl font-bold text-black text-center font-base mb-2">{pokemon.name}</div>
                    <div className="text-3xl font-bold text-black text-center font-base mb-2">{pokemon.type.join(", ")}</div>
                    <div className="overflow-x-auto w-full">
                        <table className="min-w-full divide-y-2 divide-gray-200 text-md">
                            <thead>
                                <tr>
                                    <th
                                        className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900"
                                    >
                                        Name
                                    </th>
                                    <th 
                                        className="whitespace-nowrap px-4 py-2 text-left font-semibold text-gray-900"
                                    >
                                        Value
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {pokemon.stats.map(({ name, value }) => (
                                    <tr key={name}>
                                        <td className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">{name}</td>
                                        <td className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">{value}</td>
                                    </tr>
                                ))};
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}


