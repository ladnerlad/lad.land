import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getSortedPosts } from "../lib/posts";

export async function GET(context: APIContext) {
  const posts = await getSortedPosts();

  return rss({
    title: "lad.land",
    description: "Writing from lad.",
    site: context.site!,
    customData: "<language>en-us</language>",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: new URL(`/blog#${post.id}`, context.site).href,
    })),
  });
}
