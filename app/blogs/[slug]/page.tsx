import { getBlogBySlug, getBlogs } from "@/lib/blog";
import { NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React, { use } from "react";

interface Params extends ParsedUrlQuery {
  slug: string;
}

type Props = {
  params: Params;
};

const getInitialBlog = async (slug: string) => {
  return getBlogBySlug(slug);
};

const BlogDetail: NextPage<Props> = ({ params }) => {
  const blog = use(getInitialBlog(params.slug));
  return <div>{blog.content}</div>;
};

export function generateStaticParams() {
  const blogs = getBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default BlogDetail;
