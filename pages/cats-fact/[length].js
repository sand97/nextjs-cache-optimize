import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Post({ fact }) {
    const router = useRouter()
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>A fact about cat</h1>
            <br/>
            <p>{fact}</p>
        </div>
    )
}

// This function gets called at build time
export async function getStaticPaths() {
    const paths = ['45', '90', '150'].map(length => ({
        params: {length}
    }));

    return {paths, fallback: true}
}


export async function getStaticProps({ params }) {
    console.info('get data from API');
    const response = await fetch(`https://catfact.ninja/fact?max_length=${params.length}`);
    const {fact} = await response.json();

    return {
        props: {
            fact,
        },
        revalidate: false, // One year in seconds
    }
}
