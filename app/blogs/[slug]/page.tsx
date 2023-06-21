import BlogHeader from "@/components/BlogHeader";
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
  return (
    <div className="w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 m-auto">
      <BlogHeader blog={blog} />
      <article className="prose lg:prose-xl">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </article>
    </div>
  );
};

export function generateStaticParams() {
  const blogs = getBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default BlogDetail;
