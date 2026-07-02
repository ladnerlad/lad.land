import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";

export const getStaticPaths = (async () => {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { body: post.body ?? "" },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  return new Response(props.body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
