import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

import { Blog } from "@/interfaces/blog";

const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).use(remarkGfm).process(markdown);
  return result.toString();
};

const getDir = (path: string) => join(process.cwd(), path);
const BLOG_DIR = getDir("/content/blogs");

const getFileNames = (dir: string): string[] => fs.readdirSync(dir);

const getBlogFileNames = () => getFileNames(BLOG_DIR);

const getItemInPath = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, "latin1");
  const { data, content } = matter(fileContent);
  return { ...data, content } as Blog;
};

const getBlog = (name: string) => {
  const blog = getItemInPath(join(BLOG_DIR, name));
  blog.slug = name.replace(/\.md$/, "");

  return blog;
};

const getBlogBySlug = async (slug: string) => {
  const blog = getBlog(slug + ".md");
  blog.content = await markdownToHtml(blog.content);
  return blog;
};

const getBlogs = (): Blog[] => {
  const names = getBlogFileNames();
  const items = names.map((name) => getBlog(name));
  return items;
};

export { getBlogFileNames, getBlogs, getBlogBySlug };
