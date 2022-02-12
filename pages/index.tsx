import React, { useEffect } from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import { getProperties, properties } from "../data-access/properties"
import { getSpaces } from "../data-access/spaces";

// This page will be statically rendered at build time
export const getStaticProps: GetStaticProps = async () => {
  const properties = await getProperties();
  const spaces = await getSpaces();
  const feed = [
    {
      id: 1,
      title: "Prisma is the perfect ORM for Next.js",
      content: "[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!",
      published: false,
      author: {
        name: "Nikolas Burk",
        email: "burk@prisma.io",
      },
    },
  ]
  return { props: { feed, properties, spaces } }
}

type Props = {
  feed: PostProps[],
  properties: properties[],
  spaces: any[],
};

const Blog: React.FC<Props> = (props) => {
  // Even though this page is statically rendered at build time
  // This will fetch client side
  useEffect(() => {
    fetch('/api/v1/properties').then(res => res.json()).then(console.log);
  }, []);
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
          <pre>{JSON.stringify(props.properties, null, 2)}</pre>
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
